import type { ComponentType } from "react";
import { QeetIdMock } from "./QeetIdMock";
import { QeetrixMock } from "./QeetrixMock";
import { QeetLogsMock } from "./QeetLogsMock";
import { QeetPeopleMock } from "./QeetPeopleMock";
import { QeetNotifyMock } from "./QeetNotifyMock";
import { QeetPayMock } from "./QeetPayMock";

/**
 * Maps a product's content slug to its stylized UI mock so the bento showcase
 * stays data-driven from listProducts(). Slugs match src/content/products/*.mdx.
 */
export const PRODUCT_UI: Record<string, ComponentType> = {
  qeetid: QeetIdMock,
  qeetrix: QeetrixMock,
  "qeet-logs": QeetLogsMock,
  "qeet-people": QeetPeopleMock,
  "qeet-notify": QeetNotifyMock,
  "qeet-pay": QeetPayMock,
};
