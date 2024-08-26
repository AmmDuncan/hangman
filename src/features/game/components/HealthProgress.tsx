"use client";
import { FULL_HEALTH, useHealthContext } from "../context/HealthContext";

export function HealthProgress() {
  const { health } = useHealthContext();
  return (
    <div className="flex rounded-full bg-white p-2.5 px-3">
      <div
        className="h-2 rounded-full bg-dark-navy lg:h-2.5"
        style={{ width: `${(health / FULL_HEALTH) * 100}%` }}
      ></div>
    </div>
  );
}
