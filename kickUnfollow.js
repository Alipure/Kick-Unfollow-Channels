(async () => {
    const delay = ms => new Promise(r => setTimeout(r, ms));

    while (true) {
        const cards = [...document.querySelectorAll(".group")];

        let clicked = 0;

        for (const card of cards) {
            card.scrollIntoView({ block: "center" });

            // Trigger hover
            card.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
            card.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
            card.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));

            await delay(200);

            const btn = card.querySelector('button[aria-label="Unfollow"]');

            if (btn) {
                btn.click();
                clicked++;
                console.log(`Unfollowed ${clicked}`);
                await delay(600);
            }
        }

        if (clicked === 0) {
            console.log("Done!");
            break;
        }

        await delay(1000);
    }
})();
