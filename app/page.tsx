import Pagination from "./components/Pagination";

export default function Home() {
    return <Pagination currentpage={10} itemCount={100} pageSize={10}/>;
}
