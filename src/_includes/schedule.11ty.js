const { html } = require("htm/preact");
const { mergeWith, unionBy, sortBy } = require("lodash");
const RawContent = require("./components/RawContent");

exports.data = {
  layout: "syllabus",
};

exports.render = ({ defaultSchedule, schedule, content }) => {
  const finalSchedule = mergeWith(
    schedule,
    defaultSchedule,
    (objValue, srcValue) => {
      const mergedDay = unionBy(objValue, srcValue, "start");
      return sortBy(mergedDay, "start");
    }
  );

  return html`
    <dl class="timetable">
      ${Object.entries(finalSchedule)
        .map(([weekday, day], i) =>
          day.map(({ start, end, name, type = "", url }, j) => {
            const START_TIME = 585;
            const rowStart = (start - START_TIME) / 15 + 1;
            const rowEnd = (end - START_TIME) / 15 + 1;
            const col = `${i + 1} / ${i + 2}`;
            const row = `${rowStart} / ${rowEnd}`;
            return html`
              <div
                class="entry ${type}"
                id=${j === 0 && weekday}
                data-label=${j === 0 && weekday}
                style="--col: ${col}; --row: ${row}"
              >
                <dt>
                  <span class="day">${weekday} </span>
                  <span>${formatTime(start)}-${formatTime(end)}</span>
                </dt>
                <dd>${url ? html`<a href="${url}">${name}</a>` : name}</dd>
              </div>
            `;
          })
        )
        .flat()}
    </dl>
  `;
};

function formatTime(t) {
  const hours = Math.floor(t / 60);
  const mins = t % 60;
  return (
    hours.toString().padStart(2, "0") + ":" + mins.toString().padStart(2, "0")
  );
}
