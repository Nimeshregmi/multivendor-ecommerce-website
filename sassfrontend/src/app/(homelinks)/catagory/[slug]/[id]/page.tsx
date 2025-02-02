import { FetchSingleProduct } from "@/components";
import WrapReactQuary from "@/components/common/WrapReactQuary";

const page = async (props: { params: Promise<{ slug: string; id: number }> }) => {
  const params = await props.params;
  return (
    <div>
        <FetchSingleProduct slug={params.slug} id={params.id}  />
    </div>
  );
};

export default page;
