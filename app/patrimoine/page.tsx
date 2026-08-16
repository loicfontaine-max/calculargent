import { CategoryLanding, categoryMetadata } from "../../components/CategoryLanding";
export const metadata = categoryMetadata("patrimoine");
export default function Page() { return <CategoryLanding slug="patrimoine" />; }
