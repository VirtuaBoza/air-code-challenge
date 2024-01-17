# Andrew Boza - Air Code Challenge

I cut myself off early to write this summary of my approach to this code challenge.

After reading the brief I immediately added the [shadcn](https://ui.shadcn.com/) CLI so that I could have quick access to ready-made and accessible components but still have the flexibility to adjust styling with Tailwind. The other thing I did was add [tPRC](https://trpc.io/) which is my favorite way to communicate between client and server. I _could_ have called out to your APIs directly from the client, but I'm accustomed to using the server code in the Next app to talk to other services.

One thing that scared me a bit from the prompt was the focus performance as evaluation criteria. I've never actually been involved in a project where performance was a significant concern to be honest. I find that many developers are more concerned with performance than maintainability, and I tend to focus on the latter. So one decision I made to try to ensure the app was performant was to prefer a CSS-based solution to a JS-based solution when it came to the layout of the image grids. Therefore, you'll notice that my grids behave differently than yours - most notably when it comes to the assets. I decided to change the design to allow me to more easily create a visually pleasing grid which involved rendering a grid with 3, 6, or 9 columns (depending on container width) and images that are wider than they are tall consume 2 columns. Pretty simple but I think it looks nice.

After getting the basic layout replication in place I had some extra time, so I added a context menu (right-click) for each board and asset. For assets, you have the option to open the image in a new tab and for all boards and assets you can (pretend to) download them.

Then I tried looking into the @air/react-drag-to-select package to see what was involved in that. I assumed that I would somehow be marking elements as selectable and using custom attributes to identify them, but when I learned that the `onSelectionChange` callback gives you rect coordinates, I decided there may be too much involved in the remaining time to try to write the code to determine which items are selected based on their position.

Finally, I decided to add the ellipsis menu button to the boards and assets.

If I had a little more time, I would add some state to store selected boards/assets so that I could take another pass at the context menu and ellipsis menu and have it be aware of how many items have been selected. That would lay the groundwork for use of @air/react-drag-to-select as well.

I must say, I would NOT ship this to customers as-is (lol). The way the images pop-in is not ideal, and they aren't always laid out perfectly with the new grid design I came up with. I'd be curious about what your code looks like to allow your thumbnails to load quickly and layout cleanly.
