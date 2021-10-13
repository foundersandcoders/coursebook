const { html } = require("htm/preact");
const { mergeWith, sortBy } = require("lodash");

exports.data = {
  layout: "syllabus",
};

exports.render = ({ defaultSchedule, schedule }) => {
  const finalSchedule = mergeWith(
    schedule,
    defaultSchedule,
    (day, defaultDay) => {
      // no need to override if there's nothing specified for that week
      if (!day) return defaultDay;

      // find all the defaults that haven't been overridden
      const defaultLeftovers = defaultDay.filter((defaultEntry) => {
        const override = day.find((entry) => {
          const { start, end } = entry;
          const { start: defaultStart, end: defaultEnd } = defaultEntry;
          const startedDuring = start >= defaultStart && start < defaultEnd;
          const endedDuring = entry.end > defaultStart && end < defaultEnd;
          const totalEclipse = start <= defaultStart && end >= defaultEnd;
          // override default entry if the new one overlaps it
          // e.g. a week-entry at 13:30 would stop lunch (13:00-14:00) appearing
          return startedDuring || endedDuring || totalEclipse;
        });

        return !override;
      });
      const mergedDay = [...defaultLeftovers, ...day];
      return sortBy(mergedDay, "start");
    }
  );

  return html`
    <dl class="timetable">
      ${Object.entries(finalSchedule)
        .map(([weekday, day], i) =>
          day.map(({ start, end, name, type = "", url }, j) => {
            const START_TIME = 585;
            const TIME_BLOCK = 5;
            const rowStart = (start - START_TIME) / TIME_BLOCK + 1;
            const rowEnd = (end - START_TIME) / TIME_BLOCK + 1;
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
