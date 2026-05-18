import { createSignal, createResource, Show } from "solid-js";
import Viewer, { ViewMode } from "./components/Viewer";
import { fetchMoleculeData } from "./utils/elementPos";
import { getElementInfo } from "./utils/element";

const App = () => {
  const [viewMode, setViewMode] = createSignal<ViewMode>("jointing");
  const [searchQuery, setSearchQuery] = createSignal("");
  const [moleculeData] = createResource(() => {
    const query = searchQuery().trim();
    return query ? query : false;
  }, fetchMoleculeData);

  return (
    <div class="bg-black w-screen h-screen fixed inset-0 overflow-hidden text-white select-none">
      {/* Search */}
      <div class="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-auto z-50">
        <input
          type="text"
          placeholder="Enter the molecule name (eg: Water).."
          class="p-2.5 border border-zinc-800 bg-black/40 backdrop-blur-md font-mono text-white w-full md:w-[500px] text-sm focus:outline-none focus:border-zinc-500 transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const target = e.currentTarget;
              if (target.value.trim() !== "") {
                setSearchQuery(target.value.trim());
              }
            }
          }}
        />
      </div>

      {/* controller de mode */}
      <Show
        when={
          !moleculeData.loading &&
          !moleculeData.error &&
          moleculeData() &&
          moleculeData()?.atoms
        }
      >
        <div class="absolute top-4 right-4 z-50 flex items-center border border-zinc-800 bg-black/40 backdrop-blur-sm">
          <button
            onClick={() => setViewMode("jointing")}
            class={`px-3 py-3 font-mono text-[0.65rem] tracking-widest uppercase transition-colors duration-200 cursor-pointer
      ${
        viewMode() === "jointing"
          ? "bg-zinc-100 text-black font-medium"
          : "text-zinc-500 hover:text-zinc-200"
      }`}
          >
            Jointing
          </button>

          {/* Visual Separator Divider */}
          <div class="h-4 w-[1px] bg-zinc-800" />

          {/* Bulgy Mode Toggle */}
          <button
            onClick={() => setViewMode("bulgy")}
            class={`px-3 py-3 font-mono text-[0.65rem] tracking-widest uppercase transition-colors duration-200 cursor-pointer
      ${
        viewMode() === "bulgy"
          ? "bg-zinc-100 text-black font-medium"
          : "text-zinc-500 hover:text-zinc-200"
      }`}
          >
            Bulgy
          </button>
        </div>
      </Show>

      {/* Legend de elements */}
      <Show
        when={
          !moleculeData.loading && !moleculeData.error && moleculeData()?.atoms
        }
      >
        <div class="absolute bottom-6 left-6 z-50 flex flex-col gap-2.5 max-w-[280px] border border-zinc-800 bg-black/40 backdrop-blur-sm p-4 font-mono select-none">
          <div class="text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500">
            Elements
          </div>

          <div class="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-1">
            {(() => {
              const uniqueElements = [
                ...new Set(moleculeData()?.atoms.map((a: any) => a.element)),
              ];

              return uniqueElements.map((symbol: any) => {
                const info = getElementInfo(symbol);
                const elementColor = info?.color
                  ? `#${info.color.toString(16).padStart(6, "0")}`
                  : "#ffffff";
                const elementName = info?.name || "Unknown";

                return (
                  <div class="flex items-center justify-between gap-6 text-[0.65rem] tracking-wide">
                    <div class="flex items-center gap-2 truncate">
                      <span class="text-zinc-400 font-bold uppercase w-4">
                        {symbol}
                      </span>
                      <span class="text-zinc-500 truncate">{elementName}</span>
                    </div>

                    <div
                      style={{ "background-color": elementColor }}
                      class="w-1.5 h-1.5 shrink-0"
                      title={elementColor.toUpperCase()}
                    />
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </Show>

      {(() => {
        // Loader
        if (moleculeData.loading) {
          return (
            <div class="absolute inset-0 flex flex-col items-center justify-center bg-black font-mono z-50 pointer-events-none select-none">
              <div class="flex items-center gap-4">
                {/* Razor-sharp, high-contrast block spinner */}
                <span class="w-2.5 h-2.5 border-2 border-zinc-800 border-t-zinc-200 animate-spin" />

                {/* Stark, raw text status */}
                <span class="text-[0.65rem] tracking-[0.3em] uppercase text-zinc-400">
                  Loading
                </span>
              </div>
            </div>
          );
        }

        // Error
        if (moleculeData.error) {
          return (
            <div class="absolute inset-0 flex flex-col items-center justify-center bg-black font-mono z-40 select-none">
              <div class="group relative flex items-center gap-2 cursor-help">
                <span class="text-[0.65rem] tracking-[0.3em] uppercase text-zinc-500">
                  Molecule Unavailable
                </span>

                <span class="text-[0.65rem] text-zinc-600 group-hover:text-zinc-200 transition-colors duration-150">
                  [i]
                </span>

                <div class="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 hidden group-hover:block w-72 border border-zinc-800 bg-black p-4 text-left pointer-events-none">
                  <div class="text-[0.6rem] text-zinc-400 tracking-wider uppercase mb-1.5 font-bold">
                    Possible Causes:
                  </div>
                  <p class="text-[0.62rem] text-zinc-500 tracking-wide leading-relaxed normal-case">
                    Record lacks a 3D structural conformation map (common for
                    inorganic compounds), the molecular matrix exceeds storage
                    limits, or the search query is invalid.
                  </p>
                </div>
              </div>
            </div>
          );
        }

        // Render
        if (moleculeData() && moleculeData()?.atoms) {
          return (
            <div class="w-full h-full bg-black">
              <Viewer data={moleculeData()} viewMode={viewMode()} />
            </div>
          );
        }

        // Default
        return (
          <div class="absolute inset-0 flex items-center justify-center text-zinc-600 font-mono text-xs  tracking-[0.15em] bg-black">
            Enter a molecule name to visualize
          </div>
        );
      })()}
    </div>
  );
};

export default App;
