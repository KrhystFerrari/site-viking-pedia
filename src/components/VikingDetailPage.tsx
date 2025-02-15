import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VikingDetailPage() {
  const { id } = useParams<{ id: string }>();
  interface Detail {
    title: string;
    extract: string;
  }

  const [detail, setDetail] = useState<Detail | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&pageids=${id}&format=json&origin=*`
      );
      const data = await response.json();
      if (id && data.query.pages[id]) {
        setDetail(data.query.pages[id]);
      }
    };

    fetchDetail();
  }, [id]);

  if (!detail) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl text-white font-bold mb-4">{detail.title}</h1>
      <p className="text-lg text-white">{detail.extract}</p>
      <a
        href={`https://en.wikipedia.org/?curid=${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline"
      >
        Read more on Wikipedia
      </a>
    </div>
  );
}
