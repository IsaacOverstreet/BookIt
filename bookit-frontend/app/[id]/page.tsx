import Details from "./details";

interface Params {
  params: { id: string };
}

export default async function DetailsHome({ params }: Params) {
  const { id } = await params;

  return (
    <div className="border w-full px-4 sm:px-[50px] lg:px-[50px] min-h-dvh mt-[100px]  xl:px-[115px]">
      <Details id={id} />
    </div>
  );
}
