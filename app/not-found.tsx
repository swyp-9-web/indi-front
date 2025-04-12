export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h2>
      <p className="text-muted-foreground mt-2">주소가 잘못되었거나 삭제된 페이지입니다.</p>
    </div>
  );
}
