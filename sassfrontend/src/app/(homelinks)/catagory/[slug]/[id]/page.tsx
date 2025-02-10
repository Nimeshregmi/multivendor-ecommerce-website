import { FetchSingleProduct } from "@/components";

const page = async (props: { params: Promise<{ slug: string; id: number }> }) => {
  const params = await props.params;
  return (
    <div>
          <FetchSingleProduct slug={params.slug} id={params.id} />
    </div>
  );
};

export default page;
