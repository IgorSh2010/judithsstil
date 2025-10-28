import { FaReact } from "react-icons/fa";

export default function FooterBadge() {
  return (
    <div className="justify-evenly border border-cyan-800 rounded-2xl sm:flex-row text-gray-500 sm:pt-0">
      <div style={{ fontSize: '8px' }} className="max-w-5xl mx-4 sm:flex-row items-end gap-2 sm:gap-2">
        <div className="flex items-center gap-1">
          <span>
            Powered by{" "}
            <span className="text-blue-400 font-medium">React</span>
          </span>
          <FaReact className="text-blue-400 text-sm animate-spin-slow" />
        </div>

        <div className="flex items-center gap-1">
          <span>Developed by</span>
          <a
            href="https://siteondemand.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-medium transition"
          >
            Ihor Shepetko
          </a>
        </div>
      </div>
   </div>
  );
}
