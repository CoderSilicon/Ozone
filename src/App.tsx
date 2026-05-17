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
        <div class="absolute top-[4.5rem] right-4 md:top-8 md:right-8 z-50 flex flex-col gap-2 md:gap-3 items-end">
          <div class="font-mono text-[0.65rem] md:text-xs tracking-wider bg-black/40 md:bg-transparent px-2 py-1 md:p-0 backdrop-blur-md md:backdrop-blur-none border md:border-none border-zinc-800 rounded">
            MODEL VIEW:{" "}
            <span class="text-emerald-400 font-bold">
              {viewMode().toUpperCase()}
            </span>
          </div>
          <button
            onClick={() =>
              setViewMode((v) => (v === "jointing" ? "bulgy" : "jointing"))
            }
            class="font-mono text-[0.65rem] md:text-xs tracking-widest uppercase border border-zinc-800 bg-black/60 backdrop-blur-md text-zinc-200 py-1.5 px-3 md:px-4 cursor-pointer hover:bg-zinc-900 hover:text-white transition-colors"
          >
            Switch View
          </button>
        </div>
      </Show>

      {/* Legend de elements */}
      <Show
        when={
          !moleculeData.loading &&
          !moleculeData.error &&
          moleculeData() &&
          moleculeData()?.atoms
        }
      >
        <div class="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-50 flex flex-col gap-3 md:gap-4 w-[65vw] sm:w-[50vw] md:w-auto md:max-w-sm bg-black/60 backdrop-blur-md p-3 md:p-4 border border-zinc-800 font-mono">
          <div class="flex flex-col gap-2">
            <div class="text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] text-zinc-500 font-bold">
              Detected Elements
            </div>
            <div class="flex flex-col gap-2 max-h-[35vh] md:max-h-[40vh] overflow-y-auto pr-2">
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
                    <div class="flex items-center gap-2 md:gap-3 text-xs text-zinc-300">
                      <div
                        style={{
                          "background-color": `${elementColor}15`,
                          "border-color": elementColor,
                        }}
                        class="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-bold text-xs md:text-sm border-l-2 text-white shrink-0"
                      >
                        {symbol.toUpperCase()}
                      </div>
                      <div class="flex flex-col truncate">
                        <span class="text-white text-[0.65rem] md:text-[0.75rem] font-medium tracking-wide truncate">
                          {elementName}
                        </span>
                        <span class="text-[0.55rem] md:text-[0.6rem] text-zinc-500">
                          {elementColor.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </Show>

      {/* Main Viewport State Control Engine */}
      {(() => {
        if (moleculeData.loading) {
          return (
            <div class="absolute inset-0 flex flex-col items-center justify-center bg-black font-mono z-50 pointer-events-none">
              <div class="flex items-center gap-3 border border-zinc-800 bg-zinc-950/40 backdrop-blur-md px-6 py-3 min-w-[320px] justify-between">
                <div class="flex items-center gap-2.5">
                  {/* Minimalist spinning radar line indicator */}
                  <span class="w-3 h-3 border-2 border-zinc-700 border-t-zinc-300 animate-spin" />
                  <span class="text-[0.7rem] font-bold tracking-[0.25em] text-zinc-300 ">
                    Loading :: Module
                  </span>
                </div>

                {/* Dynamic status code label */}
                <span class="text-[0.6rem] text-zinc-500  tracking-widest bg-zinc-900 px-1.5 py-0.5 border border-zinc-800">
                  LNK_01
                </span>
              </div>

              {/* Context Subtext */}
              <div class="text-zinc-600 text-[0.6rem] mt-3 tracking-[0.3em] text-center">
                Compiling structural conformation matrices
              </div>
            </div>
          );
        }

        // Error
        if (moleculeData.error) {
          return (
            <div class="absolute inset-0 flex flex-col items-center justify-center bg-black text-center p-6 z-40">
              <div class="flex flex-col items-center gap-3 border border-red-900/30 bg-zinc-950/20 max-w-xl p-8">
                <div class="text-red-500 font-bold tracking-[0.25em]  text-[0.68rem] border border-red-900/50 bg-red-950/20 px-4 py-1.5">
                  ERROR :: 404
                </div>
                <div class="text-zinc-200 text-[0.72rem] mt-3 tracking-wide leading-relaxed font-mono px-4">
                  Either the compound is inorganic and PubChem does not have a 3D
                  structural conformation map available for this record, or it is too large to store information about or last, the
                  search query itself is wrong.
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
