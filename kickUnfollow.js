(async () => {
    const delay = (ms) => new Promise(r => setTimeout(r, ms));

    const hoverCard = async (card) => {
        const rect = card.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const opts = {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: x,
            clientY: y
        };

        card.dispatchEvent(new MouseEvent("pointerover", opts));
        card.dispatchEvent(new MouseEvent("mouseover", opts));
        card.dispatchEvent(new MouseEvent("mouseenter", opts));

        await delay(300);
    };

    while (true) {
        const cards = [...document.querySelectorAll('div.group')];

        let clickedAny = false;

        for (const card of cards) {
            card.scrollIntoView({ block: "center" });
            await delay(200);

            await hoverCard(card);

            const btn = card.querySelector('button[aria-label="Unfollow"]');

            if (btn) {
                btn.click();
                console.log("Unfollow clicked");
                clickedAny = true;
                await delay(500);
            }
        }

        if (!clickedAny) {
            console.log("No more unfollows found. Done.");
            break;
        }

        // let React update DOM
        await delay(1500);
    }
})();
