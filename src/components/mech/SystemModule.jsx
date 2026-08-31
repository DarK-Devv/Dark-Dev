import { pad } from '../../lib/util';
import './SystemModule.css';

/**
 * A numbered sub-module tile of the flagship "SYSTEM 01" (FHATAL) sequence —
 * used for its 6 services. title/description/tags are existing content,
 * unchanged; this only supplies the machine-panel framing + index.
 */
export default function SystemModule({ index, title, description, tags = [] }) {
  return (
    <div className="sysmod" data-reveal="unfold" data-cursor="lock">
      <div className="sysmod__head">
        <span className="sysmod__idx">SUB-MODULE {pad(index + 1)}</span>
      </div>
      <h5 className="font-display font-bold text-lg text-white mb-2">{title}</h5>
      <p className="text-steel text-sm leading-relaxed font-light mb-4">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 font-mono text-[10px] text-signal-bright/70 border border-signal-dim/40 bg-signal/5"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
