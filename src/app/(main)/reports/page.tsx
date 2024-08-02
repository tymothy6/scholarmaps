import { FlowChart } from "./flow-chart";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const title = searchParams["report"]
    ? `${searchParams["report"]}`
    : "Reports";
  const description = "Reports generated by Scholar Maps";
  return { title, description };
}

export default function Reports() {
  return (
    <section className="flex flex-col gap-2 w-full">
      <FlowChart variant="figma" />
    </section>
  );
}
