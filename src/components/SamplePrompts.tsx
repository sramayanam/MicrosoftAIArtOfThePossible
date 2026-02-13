const SAMPLE_PROMPTS = [
  {
    title: 'AA Routes from DFW (Q1 2014)',
    prompt:
      'Display a chart that shows requested metrics for Q1 2014, list AA routes from DFW with passengers, revenue, distance, efficiency, and market share',
  },
  {
    title: 'Annual Airport Stats (2015)',
    prompt:
      'Display a chart that lists annual airport stats for 2015: destinations served, direct passengers, revenue',
  },
  {
    title: '2015 Airport Performance',
    prompt:
      'Display the chart that shows 2015 airport performance with hub status and whether they serve major or regional carriers, including revenue, passengers',
  },
];

interface SamplePromptsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

export default function SamplePrompts({ onSelect, disabled }: SamplePromptsProps) {
  return (
    <aside className="sample-prompts">
      <h3 className="sample-prompts-title">Try these prompts</h3>
      <div className="sample-prompts-list">
        {SAMPLE_PROMPTS.map((item, i) => (
          <button
            key={i}
            className="sample-prompt-card"
            onClick={() => onSelect(item.prompt)}
            disabled={disabled}
          >
            <span className="sample-prompt-icon">✈️</span>
            <div className="sample-prompt-text">
              <strong>{item.title}</strong>
              <p>{item.prompt}</p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
