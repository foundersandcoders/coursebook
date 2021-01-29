# System requirements

Web development does not require a particularly powerful computer—you'll mostly be editing text files and using a web browser.

That said there are some minimum requirements you'll need to meet to get the most out of the course.

## Summary

- We recommend using a Mac or a Windows laptop configured to dual-boot Linux
- We recommend a minimum of 5GB of free space on your laptop
- We recommend your laptop has a minimum of 4GB of RAM

## More detail

### Operating system

The most important thing is having a consistent terminal environment. macOS and Linux are both based on [Unix](https://en.wikipedia.org/wiki/Unix-like) and so have a standardised command-line environment. This is useful because most things will work cross-platform . Also pretty much all cloud platforms use Linux, so the places you are deploying code will work the same way.

Windows has a totally different command-line. The underlying OS is different enough that you will encounter issues even with very popular tools.

This is changing with [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10), which lets you run a Linux system _within_ Windows. It's still very new but looks promising for standardised development on Windows.

**We recommend using a Mac or a Windows laptop configured to dual-boot Linux**. You can read more about this in the Installation List.

### Storage

Modern JavaScript apps rely on lots of 3rd-party modules that get installed into your project. This means that although you might only have a few of your own files, you could well have hundreds of megabytes in your `node_modules` folder per project.

The React Week workshops and project alone can take up almost 1GB of space.

**We recommend a minimum of 5GB of free space on your laptop**. You can probably work with less than this but you'll have to be diligent about deleting older projects.

### RAM

You're going to be spending a lot of time in a web browser, usually with many tabs open. Modern browsers can be pretty memory-hungry (looking at you Chrome), so having more RAM tends to make for a smoother experience. If your laptop runs out of RAM it'll start suspending apps/tabs in the background, which isn't ideal.

**We recommend your laptop has a minimum of 4GB of RAM**. You can't really have too much here though, 8GB would probably be ideal.
