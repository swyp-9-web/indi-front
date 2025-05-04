export default function NoResults() {
  return (
    <div className="mt-40 flex flex-col items-center justify-center">
      <h2 className="text-custom-brand-primary mt-4 mb-6 text-center text-2xl font-bold">
        스크랩한 작품이 없습니다.
      </h2>
      <p className="text-custom-gray-400 text-sm">더 많은 작품을 확인해보세요!</p>
    </div>
  );
}
