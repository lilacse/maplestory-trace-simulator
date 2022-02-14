# Maplestory Trace Simulator

Simulates spell trace enhancement used in the game Maplestory. WIP. 

---

Todo list: 
- [x] Statistics features for SimulationTaskResult
- [ ] A static webpage as UI (WIP)
- [ ] Make the webpage mobile friendly

Low priority: 
- [ ] Lucky day scroll support
- [ ] Guardian Angel support 

---

### Dependencies

- Python 3.x (for starting local server)
- Node.js + npm
- TypeScript
- Rollup

### Usage

1. Clone this repo. 
2. Run `transpile.bat` to transpile the `.ts` files into `.js` files and bundle them into one file. 
3. Run `start_local_server.bat` to start the local server (might conflict with other local servers if you already have one, but you might know how to resolve that if you already have another local server :) )
4. Visit `http://localhost:8000` and navigate to `src/html/tracesim.html` in your browser. 