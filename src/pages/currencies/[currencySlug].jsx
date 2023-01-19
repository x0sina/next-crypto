import http from "@/services/HttpService";

const currency = ({ currency }) => {
    const { detail, article, trending, gravityFlag, projectInfoFlag, airDropFlag, announcement, mainAccount } = currency
    return (
        <div>{detail.name}</div>
    );
}

export default currency;

export const getServerSideProps = async ({ params }) => {
    const { data } = await http.get(`/aggr/v3/web/coin-detail?slug=${params.currencySlug}&langCode=en&aux=status`)
    return {
        props: {
            currency: data.data
        }
    }
}