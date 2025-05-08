'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProductDetailProps {
  images: string[];
  title: string;
  price: number;
  sizes: string[];
  description: string;
  material: string;
  dimensions: { width: number; height: number; depth: number };
  author: { name: string; avatarUrl: string; following: boolean };
  likes: number;
  views: number;
  commentsCount: number;
}

interface CommentType {
  id: string;
  author: { name: string; avatarUrl: string };
  content: string;
  createdAt: string;
}

export default function ProductDetail() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState<ProductDetailProps | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const prodRes = await fetch(`/api/products/${productId}`);
        if (!prodRes.ok) throw new Error('상품 정보를 가져오는 중 오류 발생');
        const prodData: ProductDetailProps = await prodRes.json();
        setProduct(prodData);
        setSelectedSize(prodData.sizes[0] ?? '');
        const commRes = await fetch(`/api/products/${productId}/comments`);
        if (!commRes.ok) throw new Error('댓글 정보를 가져오는 중 오류 발생');
        const commData: CommentType[] = await commRes.json();
        setComments(commData);
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    if (productId) loadData();
  }, [productId]);

  if (loading) return <div className="mx-auto max-w-4xl p-6">로딩 중...</div>;
  if (error) return <div className="mx-auto max-w-4xl p-6">에러: {error}</div>;
  if (!product) return <div className="mx-auto max-w-4xl p-6">상품을 찾을 수 없습니다.</div>;
  const { images, title, price, sizes, description, material, dimensions, author, likes, views } =
    product;

  if (images.length === 0) {
    return <div className="mx-auto max-w-4xl p-6">이미지 정보가 없습니다.</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <span>전체</span>
        <span>/</span>
        <span>시각 예술</span>
      </nav>

      {/* Top Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Image Gallery */}

        {/* Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-2xl text-gray-900">{price.toLocaleString()}원</p>

          <div>
            <label className="block text-sm font-medium text-gray-700">사이즈(cm)</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <Button className="mt-4 w-full">장바구니에 담기</Button>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>♥ {likes}</span>
            <span>👁️ {views}</span>
            <span>💬 {comments.length}</span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">작품설명</h2>
        <p className="text-gray-700">{description}</p>
      </section>

      {/* Details Section */}
      <section className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium">재질</h3>
          <p className="mt-1 text-gray-700">{material}</p>
        </div>
        <div>
          <h3 className="font-medium">크기</h3>
          <p className="mt-1 text-gray-700">
            가로 {dimensions.width}cm x 세로 {dimensions.height}cm x 폭 {dimensions.depth}cm
          </p>
        </div>
      </section>

      {/* Author Info */}
      <Card>
        <CardContent className="flex items-center space-x-4">
          <Image
            src={author.avatarUrl}
            alt={author.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex-1">
            <p className="font-medium">{author.name}</p>
            <Button size="sm">{author.following ? '언팔로우' : '팔로우'}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <section>
        <h2 className="text-xl font-semibold">댓글 ({comments.length})</h2>
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4">
                <Image
                  src={comment.author.avatarUrl}
                  alt={comment.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">
                    {comment.author.name}{' '}
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </p>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">첫 댓글을 남겨보세요!</p>
          )}
        </div>
      </section>
    </div>
  );
}
