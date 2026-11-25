    // 将你的 JSON 文件放在 ./data/steam.json。
    // 如果文件名或路径不同，只需要修改下面这一行。
    const DATA_URL = "data/steam——games.json";
    const PAGE_SIZE = 100;

    let games = [];
    let currentPage = 1;

    const $ = (id) => document.getElementById(id);

    function number(value) {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : 0;
    }

    function formatHours(value) {
      return number(value).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }) + "h";
    }

    function escapeHTML(value) {
      return String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[char]);
    }

    function getFilteredGames() {
      const keyword = $("search").value.trim().toLocaleLowerCase();
      const filter = $("filter").value;
      const sort = $("sort").value;

      let result = games.filter((game) => {
        const name = String(game.name ?? "").toLocaleLowerCase();
        const matchesSearch = name.includes(keyword);

        const unlocked = number(game.unlocked);
        const total = number(game.total);
        const percent = number(game.achievement_percent);

        let matchesFilter = true;
        if (filter === "completed") {
          matchesFilter = total > 0 && (unlocked >= total || percent >= 99.999);
        } else if (filter === "incomplete") {
          matchesFilter = total > 0 && unlocked < total;
        } else if (filter === "played") {
          matchesFilter = number(game.recent_hours) > 0;
        }

        return matchesSearch && matchesFilter;
      });

      const sorters = {
        "hours-desc": (a, b) => number(b.hours) - number(a.hours),
        "hours-asc": (a, b) => number(a.hours) - number(b.hours),
        "recent-desc": (a, b) => number(b.recent_hours) - number(a.recent_hours),
        "recent-asc": (a, b) => number(a.recent_hours) - number(b.recent_hours),
        "achievement-desc": (a, b) => number(b.achievement_percent) - number(a.achievement_percent),
        "achievement-asc": (a, b) => number(a.achievement_percent) - number(b.achievement_percent),
        "name-asc": (a, b) => String(a.name ?? "").localeCompare(String(b.name ?? "")),
        "name-desc": (a, b) => String(b.name ?? "").localeCompare(String(a.name ?? ""))
      };

      result.sort(sorters[sort] || sorters["hours-desc"]);
      return result;
    }

    function renderStats() {
      const totalHours = games.reduce((sum, game) => sum + number(game.hours), 0);
      const recentHours = games.reduce((sum, game) => sum + number(game.recent_hours), 0);

      $("gameCount").textContent = games.length.toLocaleString("en-US");
      $("totalHours").textContent = formatHours(totalHours);
      $("recentHours").textContent = formatHours(recentHours);
    }

    function renderTable() {
      const filtered = getFilteredGames();
      const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

      currentPage = Math.min(Math.max(1, currentPage), pageCount);

      const start = (currentPage - 1) * PAGE_SIZE;
      const pageGames = filtered.slice(start, start + PAGE_SIZE);

      if (pageGames.length === 0) {
        $("gameTable").innerHTML =
          '<tr><td colspan="4" class="empty">No games found.</td></tr>';
      } else {
        $("gameTable").innerHTML = pageGames.map((game) => {
          const name = escapeHTML(game.name || "Unknown game");
          const appid = Math.max(0, Math.floor(number(game.appid)));
          const hours = formatHours(game.hours);
          const recent = formatHours(game.recent_hours);
          const unlocked = Math.max(0, Math.floor(number(game.unlocked)));
          const total = Math.max(0, Math.floor(number(game.total)));
          const percent = Math.min(100, Math.max(0, number(game.achievement_percent)));
          const storeUrl = appid > 0
            ? `https://store.steampowered.com/app/${appid}/`
            : null;

          const gameLabel = storeUrl
            ? `<a class="game-name" href="${storeUrl}" target="_blank" rel="noopener noreferrer">${name}</a>`
            : `<span class="game-name">${name}</span>`;

          return `
            <tr>
              <td>
                ${gameLabel}
                <span class="appid">${appid > 0 ? "APPID " + appid : "APPID N/A"}</span>
              </td>
              <td class="numeric">${hours}</td>
              <td class="numeric">${recent}</td>
              <td class="achievement-cell">
                <div class="achievement-top">
                  <span>${unlocked} / ${total}</span>
                  <span class="achievement-rate">${percent.toFixed(1)}%</span>
                </div>
                <div class="progress-track" role="progressbar"
                  aria-valuenow="${percent.toFixed(1)}" aria-valuemin="0" aria-valuemax="100"
                  aria-label="${name} achievement completion">
                  <div class="progress-bar" style="width:${percent}%"></div>
                </div>
              </td>
            </tr>
          `;
        }).join("");
      }

      $("resultCount").textContent =
        `Showing ${filtered.length ? start + 1 : 0}–${Math.min(start + PAGE_SIZE, filtered.length)} of ${filtered.length} games`;

      $("pageInfo").textContent = `${currentPage} / ${pageCount}`;
      $("prevPage").disabled = currentPage <= 1;
      $("nextPage").disabled = currentPage >= pageCount;
    }

    function refresh() {
      currentPage = 1;
      renderTable();
    }

    async function loadLibrary() {
      try {
        const response = await fetch(DATA_URL, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("JSON 顶层必须是数组，例如 [{\"name\":\"...\"}]");
        }

        games = data.filter((item) => item && typeof item === "object");
        renderStats();
        renderTable();
      } catch (error) {
        console.error("Failed to load Steam library:", error);
        $("gameTable").innerHTML = `
          <tr><td colspan="4" class="empty">
            无法读取游戏数据。请确认文件位于 <code>${escapeHTML(DATA_URL)}</code>，
            且通过本地服务器或网站地址访问此页面。
          </td></tr>
        `;
        $("resultCount").textContent = "Data loading failed";
        $("gameCount").textContent = "—";
        $("totalHours").textContent = "—";
        $("recentHours").textContent = "—";
      }
    }

    $("search").addEventListener("input", refresh);
    $("filter").addEventListener("change", refresh);
    $("sort").addEventListener("change", refresh);

    $("prevPage").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    $("nextPage").addEventListener("click", () => {
      const pageCount = Math.max(1, Math.ceil(getFilteredGames().length / PAGE_SIZE));
      if (currentPage < pageCount) {
        currentPage++;
        renderTable();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    document.querySelectorAll("[data-sort]").forEach((button) => {
      button.addEventListener("click", () => {
        const field = button.dataset.sort;
        const selectValue = $("sort").value;
        const descending = selectValue.endsWith("-desc");
        const nextDescending = field === "hours" || field === "recent_hours"
          ? !descending
          : true;

        $("sort").value = field === "hours"
          ? (nextDescending ? "hours-desc" : "hours-asc")
          : (nextDescending ? "recent-desc" : "recent-asc");
        refresh();
      });
    });

    loadLibrary();