export default function App() {
  return (
    <div className="bg-[hsl(var(--background))] h-screen">
      <div className="bg-[hsl(var(--card))) p-5 w-52">
        <button
          className="
            inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg
            transition-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2
            disabled:pointer-events-none disabled:opacity-50
            [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
            bg-gradient-to-r from-[hsl(var(--saturn-gold))] to-[hsl(var(--saturn-orange))]
            text-[hsl(var(--space-dark))]
            hover:from-[hsl(var(--saturn-amber))] hover:to-[hsl(var(--saturn-gold))]
            shadow-[var(--glow-saturn)]
            font-bold text-lg h-10 px-4 py-2 flex-1
          "
        >
          LAUNCH
        </button>

      </div>
    </div>
  );
}

/*
class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-gradient-to-r from-saturn-gold to-saturn-orange text-space-dark hover:from-saturn-amber hover:to-saturn-gold saturn-glow font-bold text-lg h-10 px-4 py-2 flex-1"
*/
