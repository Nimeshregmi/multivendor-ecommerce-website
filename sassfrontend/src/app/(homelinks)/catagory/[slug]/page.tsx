import { CardWrapper, ProductCard } from "@/components"


const page = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  return (
    <>
    {/* <CardWrapper title={`${params.slug} Category`} >
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    </CardWrapper> */}
    </>
  )
}

export default page