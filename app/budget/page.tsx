import { CategoryLanding, categoryMetadata } from "../../components/CategoryLanding";
export const metadata = categoryMetadata("budget");
export default function Page() { return <CategoryLanding slug="budget" />; }
