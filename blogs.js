  // Mobile menu
      const mobileMenu = document.getElementById("mobileMenu");
      const navLinks = document.getElementById("navLinks");
      mobileMenu?.addEventListener("click", () => navLinks.classList.toggle("active"));

      // Blog filter + search (SEO-friendly because posts are still in HTML)
      const chips = Array.from(document.querySelectorAll(".chip"));
      const posts = Array.from(document.querySelectorAll(".post, .featured-post"));
      const searchInput = document.getElementById("searchInput");

      function applyFilters() {
        const activeChip = document.querySelector(".chip.active");
        const filter = activeChip?.getAttribute("data-filter") || "all";
        const q = (searchInput?.value || "").trim().toLowerCase();

        posts.forEach((p) => {
          const category = (p.getAttribute("data-category") || "").toLowerCase();
          const title = (p.getAttribute("data-title") || "").toLowerCase();
          const text = (p.innerText || "").toLowerCase();

          const matchesCategory = filter === "all" || category === filter;
          const matchesSearch = !q || title.includes(q) || text.includes(q);

          p.style.display = matchesCategory && matchesSearch ? "" : "none";
        });
      }

      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          chips.forEach((c) => c.classList.remove("active"));
          chip.classList.add("active");
          applyFilters();
        });
      });

      searchInput?.addEventListener("input", applyFilters);

      // Sidebar topic shortcuts
      document.querySelectorAll("[data-topic]").forEach((a) => {
        a.addEventListener("click", () => {
          const topic = a.getAttribute("data-topic");
          const chip = document.querySelector(`.chip[data-filter="${topic}"]`);
          if (chip) chip.click();
        });
      });