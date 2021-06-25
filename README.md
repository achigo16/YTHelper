# YTHelper

Helper to get information about videos from youtube build by [Express JS](https://expressjs.com/) & [ytdl-core](https://github.com/fent/node-ytdl-core).

## Getting Started

1. Clone this repository
```bash
git clone https://github.com/mooradal/youtubeDownloader
```

2. Install all the packages and dependencies
```bash
yarn install
```

3. Run it
```bash
node index.js
```

or use nodemon

```bash
npm run dev
```
or
```bash
nodemon index.js
```

## Usage
You can deploy on your server or you can access from https://yt-helper.vercel.app/api/.
```js
https://yt-helper.vercel.app/api/get?url=http://www.youtube.com/watch?v=aqz-KE-bpKQ
```
Support all API from [ytdl-core](https://github.com/fent/node-ytdl-core).

## How to contributing
For starter, if you contribute on this project, please create a new branch on `git` for seperate
workspace from the others contributor. And classified that you working on based on this list:
- `feature/{name or module}` => For working on some new feature.
- `fixing/{name or module}` => For working on fixing some bug.
- `enhancement/{feature name or module}` => For working on if your feature got some improvement.

## Pull Requests
At some point, after your progress was pushed to `git` and want to merge into current release `(master branch)`,
you can create a `Pull Requests` and choose `Squash and merge` to create one commit from your progress
into `master` branch. 

## License

[MIT](https://choosealicense.com/licenses/mit/)
