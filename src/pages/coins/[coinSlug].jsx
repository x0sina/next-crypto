import http from "@/services/HttpService";

const Coin = ({ coin }) => {
    console.log(coin);
    return (
        <div>{coin.name}</div>
    );
}

export default Coin;

export const getServerSideProps = async ({ params }) => {
    const { data } = await http.get(`/coins/${params.coinSlug}`)
    return {
        props: {
            coin: data.items[0]
        }
    }
}