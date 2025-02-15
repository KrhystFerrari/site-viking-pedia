import { useState } from "react";

export default function WikipediaSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  interface SearchResult {
    pageid: number;
    title: string;
    snippet: string;
  }

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const searchWikipedia = async () => {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchTerm}&format=json&origin=*`
    );
    const data = await response.json();
    setSearchResults(data.query.search);
  };

  return (
    <div className="mt-8">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Wikipedia about Vikings"
        className="p-2 border border-accent rounded-lg"
      />
      <button
        onClick={searchWikipedia}
        className="ml-2 bg-accent text-secondary px-4 py-2 rounded-lg"
      >
        Search
      </button>

      <div className="mt-4">
        {searchResults.map((result) => (
          <div key={result.pageid} className="mb-4">
            <h3 className="text-xl text-white font-semibold">{result.title}</h3>
            <p className="text-white" dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
            <a
              href={`https://en.wikipedia.org/?curid=${result.pageid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
