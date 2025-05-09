import ProductRegisterForm from './_components/ProductRegisterForm';

// TODO: 동작(수정, 임시저장)에 따라 initialValue를 zustand 혹은 query로 받아서 설정해줘야 함
export default function RegisterProduct() {
  return (
    <main className="w-8xl mx-auto mt-25 px-20">
      <h2 className="text-custom-brand-primary mb-12.5 text-2xl font-bold">작품 등록하기</h2>

      <ProductRegisterForm initialValues={null} />
    </main>
  );
}
