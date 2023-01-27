import http from "@/services/HttpService";
import { useEffect, useRef, useState } from "react";
import Chart from '@qognicafinance/react-lightweight-charts'
import { formatAMPM, getDate, toPrice } from "@/utils/utils";

const Graph = ({ id, avgColor }) => {
    const chart = useRef();
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const { data } = await http.get(`/data-api/v3/cryptocurrency/detail/chart?id=${id}&range=1D`)
            const points = data.data.points
            const pointDatas = Object.keys(points).map((key, index) => {
                const point = points[key]
                const date = new Date(Number(key) * 1000).toISOString()
                return { marketCap: point.v[2], value: point.v[0], time: Number(key) }
            })
            setChartData([{
                options: {
                    topColor: `rgba(${avgColor.r},${avgColor.g},${avgColor.b}, 0.56)`,
                    bottomColor: `rgba(${avgColor.r},${avgColor.g},${avgColor.b}, 0.04)`,
                    lineColor: `rgba(${avgColor.r},${avgColor.g},${avgColor.b}, 1)`,
                    lineWidth: 2,
                }, data: pointDatas
            }])
        }
        fetch()
    }, [])

    const toolTip = document.createElement('div');
    if (chartData && chart.current) {
        const toolTipWidth = 100;
        const toolTipHeight = 80;
        const toolTipMargin = 15;
        toolTip.classList = 'top-3 left-3 z-30 absolute pointer-events-none hidden rounded-lg bg-white text-xs w-28 shadow-md'
        chart.current.appendChild(toolTip);
    }
    const crosshairHandler = (param) => {
        if (!param.time || param.point.x < 0 || param.point.x > window.innerWidth || param.point.y < 0 || param.point.y > 320) {
            toolTip.style.display = 'none';
            return;
        }
        const dateStr = formatAMPM(param.time);
        const toolTipWidth = 100;
        const toolTipHeight = 80;
        const toolTipMargin = 15;

        toolTip.style.display = 'block';
        const price = [...param.seriesPrices.values()][0];

        toolTip.innerHTML = (`
            <div class='p-4 text-start'>
                <div class='flex items-center flex-col md:flex-row'>
                    <p class='font-semibold'>
                        ${getDate(param.time)}
                    </p>
                    <p>
                        ${dateStr}
                    </p>
                </div>
            </div>
        `);

        const y = param.point.y;

        let left = param.point.x + toolTipMargin;
        if (left > window.innerWidth - toolTipWidth) {
            left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (top > 320 - toolTipHeight) {
            top = y - toolTipHeight - toolTipMargin;
        }

        toolTip.style.left = left + 'px';
        toolTip.style.top = top + 'px';
    }
    const options = {
        alignLabels: true,
        timeScale: {
            rightOffset: 12,
            barSpacing: 3,
            fixLeftEdge: true,
            lockVisibleTimeRangeOnResize: true,
            rightBarStaysOnScroll: true,
            borderVisible: false,
            borderColor: "#fff000",
            visible: true,
            timeVisible: true,
            secondsVisible: false,
        },
        grid: {
            vertLines: {
                color: 'rgba(0, 0, 0, 0)',
            },
            horzLines: {
                color: 'rgba(0, 0, 0, 0)',
            },
        },
    }

    return (
        <div className="relative overflow-x-clip" ref={chart}>
            <Chart onCrosshairMove={crosshairHandler} options={options} areaSeries={chartData} autoWidth height={320} />
        </div>
    );


}


export default Graph;