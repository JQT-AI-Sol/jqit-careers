import { describe, it, expect } from "vitest";
import {
  entrySchema,
  applicationTypes,
  experiences,
  positions,
  applicationTypeLabels,
  experienceLabels,
  positionLabels,
} from "@/lib/entry-schema";

/** 妥当な入力のベース。各テストで一部を上書きして使う。 */
function validInput(overrides: Record<string, unknown> = {}) {
  return {
    name: "山田太郎",
    email: "taro@example.com",
    phone: "09012345678",
    applicationType: "apply" as const,
    desiredPositions: ["dev"] as const,
    experience: "experienced" as const,
    message: "よろしくお願いします。",
    portfolioUrl: "",
    consent: true as const,
    ...overrides,
  };
}

describe("entrySchema - enums / labels", () => {
  it("enum 定数が想定通りの値を持つ", () => {
    expect(applicationTypes).toEqual(["apply", "casual"]);
    expect(experiences).toEqual(["inexperienced", "experienced"]);
    expect(positions).toEqual(["dev", "infra", "qa", "ai"]);
  });

  it("ラベルが全 enum 値をカバーする", () => {
    for (const t of applicationTypes) {
      expect(applicationTypeLabels[t]).toBeTruthy();
    }
    for (const e of experiences) {
      expect(experienceLabels[e]).toBeTruthy();
    }
    for (const p of positions) {
      expect(positionLabels[p]).toBeTruthy();
    }
  });
});

describe("entrySchema - 正常系", () => {
  it("全フィールドが揃えば parse 成功する", () => {
    const result = entrySchema.safeParse(validInput());
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("山田太郎");
      expect(result.data.desiredPositions).toEqual(["dev"]);
      expect(result.data.consent).toBe(true);
    }
  });

  it("desiredPositions を複数指定できる", () => {
    const result = entrySchema.safeParse(
      validInput({ desiredPositions: ["dev", "infra", "qa", "ai"] }),
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.desiredPositions).toEqual(["dev", "infra", "qa", "ai"]);
    }
  });

  it.each(applicationTypes)("applicationType=%s を受け付ける", (t) => {
    expect(entrySchema.safeParse(validInput({ applicationType: t })).success).toBe(
      true,
    );
  });

  it.each(experiences)("experience=%s を受け付ける", (e) => {
    expect(entrySchema.safeParse(validInput({ experience: e })).success).toBe(
      true,
    );
  });

  it.each(positions)("desiredPositions=[%s] を受け付ける", (p) => {
    expect(
      entrySchema.safeParse(validInput({ desiredPositions: [p] })).success,
    ).toBe(true);
  });
});

describe("entrySchema - 異常系", () => {
  it("email が不正な形式だと失敗する", () => {
    const result = entrySchema.safeParse(validInput({ email: "not-an-email" }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("desiredPositions が空配列だと失敗する", () => {
    const result = entrySchema.safeParse(validInput({ desiredPositions: [] }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.desiredPositions).toBeDefined();
    }
  });

  it("desiredPositions に未定義の職種が含まれると失敗する", () => {
    expect(
      entrySchema.safeParse(validInput({ desiredPositions: ["unknown"] }))
        .success,
    ).toBe(false);
  });

  it("consent=false だと失敗する", () => {
    const result = entrySchema.safeParse(validInput({ consent: false }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.consent).toBeDefined();
    }
  });

  it("consent 未指定（undefined）だと失敗する", () => {
    const input = validInput();
    delete (input as Record<string, unknown>).consent;
    expect(entrySchema.safeParse(input).success).toBe(false);
  });

  it("name が空文字だと失敗する", () => {
    const result = entrySchema.safeParse(validInput({ name: "" }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeDefined();
    }
  });

  it("message が空文字だと失敗する", () => {
    const result = entrySchema.safeParse(validInput({ message: "" }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.message).toBeDefined();
    }
  });

  it("phone が桁不足（10桁未満）だと失敗する", () => {
    const result = entrySchema.safeParse(validInput({ phone: "090123" }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.phone).toBeDefined();
    }
  });

  it("phone に許可されない文字が含まれると失敗する", () => {
    expect(
      entrySchema.safeParse(validInput({ phone: "090-1234-567a" })).success,
    ).toBe(false);
  });

  it("applicationType が enum 外だと失敗する", () => {
    expect(
      entrySchema.safeParse(validInput({ applicationType: "invalid" })).success,
    ).toBe(false);
  });

  it("experience が enum 外だと失敗する", () => {
    expect(
      entrySchema.safeParse(validInput({ experience: "invalid" })).success,
    ).toBe(false);
  });
});

describe("entrySchema - 境界値 (name 1..50)", () => {
  it("name 1文字は OK", () => {
    expect(entrySchema.safeParse(validInput({ name: "あ" })).success).toBe(true);
  });

  it("name 50文字は OK（境界）", () => {
    expect(
      entrySchema.safeParse(validInput({ name: "あ".repeat(50) })).success,
    ).toBe(true);
  });

  it("name 51文字は NG（境界超過）", () => {
    expect(
      entrySchema.safeParse(validInput({ name: "あ".repeat(51) })).success,
    ).toBe(false);
  });
});

describe("entrySchema - 境界値 (message 1..2000)", () => {
  it("message 1文字は OK", () => {
    expect(entrySchema.safeParse(validInput({ message: "a" })).success).toBe(
      true,
    );
  });

  it("message 2000文字は OK（境界）", () => {
    expect(
      entrySchema.safeParse(validInput({ message: "a".repeat(2000) })).success,
    ).toBe(true);
  });

  it("message 2001文字は NG（境界超過）", () => {
    expect(
      entrySchema.safeParse(validInput({ message: "a".repeat(2001) })).success,
    ).toBe(false);
  });
});

describe("entrySchema - 境界値 (phone 10..15)", () => {
  it("phone 10桁は OK（下限）", () => {
    expect(
      entrySchema.safeParse(validInput({ phone: "0123456789" })).success,
    ).toBe(true);
  });

  it("phone 15桁は OK（上限）", () => {
    expect(
      entrySchema.safeParse(validInput({ phone: "012345678901234" })).success,
    ).toBe(true);
  });

  it("phone 16桁は NG（上限超過）", () => {
    expect(
      entrySchema.safeParse(validInput({ phone: "0123456789012345" })).success,
    ).toBe(false);
  });
});

describe("entrySchema - portfolioUrl (任意)", () => {
  it("空文字は許可される", () => {
    expect(
      entrySchema.safeParse(validInput({ portfolioUrl: "" })).success,
    ).toBe(true);
  });

  it("未指定（undefined）でも許可される", () => {
    const input = validInput();
    delete (input as Record<string, unknown>).portfolioUrl;
    expect(entrySchema.safeParse(input).success).toBe(true);
  });

  it("正しい URL 形式は許可される", () => {
    expect(
      entrySchema.safeParse(
        validInput({ portfolioUrl: "https://example.com/portfolio" }),
      ).success,
    ).toBe(true);
  });

  it("不正な URL 形式（空でない非URL）は失敗する", () => {
    const result = entrySchema.safeParse(
      validInput({ portfolioUrl: "not a url" }),
    );
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.portfolioUrl).toBeDefined();
    }
  });
});
