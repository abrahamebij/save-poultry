const diseases = [
  "Newcastle Disease",
  "Marek's Disease",
  "Coccidiosis",
  "Avian Influenza",
  "Infectious Bronchitis",
  "Fowl Pox",
  "Salmonellosis",
  "Aspergillosis",
  "Bumblefoot",
  "Egg-bound",
];

export default function DiseaseTicker() {
  const doubled = [...diseases, ...diseases];

  return (
    <div className="overflow-hidden border-y border-primary-mid bg-primary-light py-4">
      <div className="flex animate-marquee gap-10 whitespace-nowrap">
        {doubled.map((d, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 text-sm font-500 text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}
