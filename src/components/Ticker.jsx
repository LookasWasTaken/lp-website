// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "motion/react";

const lines = [
  {
    items: ["React", "Tailwind CSS", "WordPress", "JavaScript"],
    reverse: false,
  },
  {
    items: ["PHP", "Git", "Vite", "CSS", "HTML", "Frontend"],
    reverse: true,
  },
  {
    items: ["Web Developer", "Roma", "Freelance", "UI Design"],
    reverse: false,
  },
  {
    items: ["Problem Solving", "Open to Work", "Creative", "Clean Code"],
    reverse: true,
  },
];

function TickerLine({ items, offset }) {
  const doubled = items.flatMap((item) => [item, item]);
  const repeated = [...doubled, ...doubled, ...doubled];

  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex gap-8 whitespace-nowrap items-center"
        style={{ x: offset }}
      >
        {repeated.map((item, index) =>
          index % 2 === 0 ? (
            <span
              key={index}
              className="font-gothic text-8xl uppercase tracking-tight shrink-0 text-white"
            >
              {item}
            </span>
          ) : (
            <span
              key={index}
              className="font-gothic text-8xl uppercase tracking-tight shrink-0"
              style={{
                WebkitTextStroke: "2px #7c3aed",
                color: "transparent",
              }}
            >
              {item}
            </span>
          ),
        )}
      </motion.div>
    </div>
  );
}

function Ticker() {
  const { scrollY } = useScroll();
  const invertScroll = useTransform(() => scrollY.get() * -1);

  return (
    <div className="bg-gray-950 py-8">
      {lines.map((line, index) => (
        <TickerLine
          key={index}
          items={line.items}
          offset={line.reverse ? invertScroll : scrollY}
        />
      ))}
    </div>
  );
}

export default Ticker;
