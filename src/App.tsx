import { createSignal, createResource, Show } from "solid-js";
import Viewer, { ViewMode } from "./components/Viewer";
import { fetchMoleculeData } from "./utils/elementPos"; //

const App = () => {
  const [viewMode, setViewMode] = createSignal<ViewMode>("jointing");
  const [searchQuery, setSearchQuery] = createSignal("");

  // createResource handles the async fetching state automatically
  const [moleculeData] = createResource(searchQuery, fetchMoleculeData); //

  return (
    <div class="bg-zinc-950 h-screen relative text-white">
      {/* Search HUD */}
      <div class="absolute top-8 left-8 z-100">
        <input
          type="text"
          placeholder="Enter the molcule name (eg: Water, Caffeine, etc.).."
          class="p-2.5  border border-[#444] bg-transparent font-mono text-white w-xl"
          onKeyDown={(e) =>
            e.key === "Enter" && setSearchQuery(e.currentTarget.value)
          }
        />
        <Show when={moleculeData.loading}>
          <div
            class="absolute top-24 left-8 z-[100] flex flex-col gap-2 p-4 min-w-[280px] 
              bg-zinc-500/5 border-l-2 border-zinc-200 
              font-mono "
          >
            {/* Animated Scanner Bar */}
            <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
              <div
                class="w-full h-1/2 bg-gradient-to-b from-transparent via-zinc-500/10 to-transparent 
                  animate-[scan_2s_linear_infinite]"
              />
            </div>

            <div class="flex justify-between items-center">
              <span class="text-[0.7rem] font-bold tracking-[0.2em] text-zinc-100 uppercase">
                System: Reconstructing
              </span>
              <span class="flex gap-1">
                <span class="w-1 h-1 bg-zinc-500 animate-pulse" />
                <span class="w-1 h-1 bg-zinc-500 animate-pulse [animation-delay:200ms]" />
                <span class="w-1 h-1 bg-zinc-500 animate-pulse [animation-delay:400ms]" />
              </span>
            </div>

            <div class="h-[1px] w-full bg-white/10 relative overflow-hidden">
              <div class="absolute inset-0 w-1/3 bg-zinc-400 shadow-[0_0_8px_#f97316] animate-[progress_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </Show>
      </div>

      {/* View Mode Controller */}
      <div class="absolute top-8 right-8 z-100 flex flex-col gap-4">
        <div class="font-mono text-right">
          View: <span class="text-[#00ff00]">{viewMode().toUpperCase()}</span>
        </div>

        <button
          onClick={() =>
            setViewMode((v) => (v === "jointing" ? "bulgy" : "jointing"))
          }
          class="font-mono bg-transparent border border-[#444] text-white padding-[10px_20px] cursor-pointer"
        >
          Switch View
        </button>
      </div>

      {/* Only render Viewer if data exists */}
      {moleculeData() && <Viewer data={moleculeData()} viewMode={viewMode()} />}
    </div>
  );
};

export default App;
