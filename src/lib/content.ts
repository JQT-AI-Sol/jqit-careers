import jobsData from "@/../content/jobs.json";
import interviewsData from "@/../content/interviews.json";
import faqData from "@/../content/faq.json";
import statsData from "@/../content/stats.json";
import flowData from "@/../content/recruit-flow.json";

export type Job = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  idealProfile: string[];
  welcomeSkills: string[];
  cases?: string[];
  acceptInexperienced: boolean;
  acceptExperienced: boolean;
};

export type Interview = {
  slug: string;
  role: string;
  name: string;
  dept?: string;
  career?: string;
  title: string;
  excerpt: string;
  note?: string;
};

export type Faq = { q: string; a: string };
export type Stat = { value: string; unit: string; label: string };
export type FlowStep = { step: string; title: string; desc: string };

export const jobs: Job[] = jobsData as Job[];
export const interviews: Interview[] = interviewsData as Interview[];
export const faqs: Faq[] = faqData as Faq[];
export const stats: Stat[] = statsData as Stat[];
export const recruitFlow: FlowStep[] = flowData as FlowStep[];

export const jobCategoryValues = ["dev", "infra", "qa", "ai"] as const;
export type JobCategoryValue = (typeof jobCategoryValues)[number];

// slug ↔ フォームの希望職種value 対応
export const jobSlugToValue: Record<string, JobCategoryValue> = {
  engineer: "dev",
  infra: "infra",
  qa: "qa",
  ai: "ai",
};

export const positionLabels: Record<JobCategoryValue, string> = {
  dev: "開発",
  infra: "インフラ",
  qa: "QA",
  ai: "AI",
};

// 会社・ミッション・事業（Why JQIT）
export const company = {
  mission: "技術の力で、お客様の本質的な課題を解決する。",
  missionBody:
    "私たちは、単にシステムを開発する会社ではありません。お客様と共に走り、ビジネスを成功させるために本当に必要なことを考え抜きます。確かな技術力と、「使う人」を想う日本ならではの細やかな品質を掛け合わせ、社会に新しい価値を創造します。",
  values: ["挑戦と革新", "本質的な課題解決", "使う人を想う日本品質"],
  businesses: [
    {
      name: "ITソリューション事業",
      body: "システムインテグレーションと技術支援（SES）を通じ、顧客のITニーズに最適なシステム開発・運用支援を提供します。",
    },
    {
      name: "AIソリューション事業",
      body: "大規模言語モデルを中心とした最先端テクノロジーでAIトランスフォーメーションを推進。AIエージェント開発や生成AIのビジネス活用を支援します。",
    },
  ],
  product: {
    name: "NOVA",
    body: "AIマッチング×一元管理で、SES営業の生産性を劇的に向上させる自社プロダクト。",
  },
};

// 4つの強み
export const strengths = [
  { no: "01", title: "開発", body: "要件定義から運用まで、上流〜実装を一気通貫。モダンな技術スタックで価値を届ける。" },
  { no: "02", title: "インフラ", body: "クラウド設計・構築・運用自動化。安定とスケールを支える基盤づくり。" },
  { no: "03", title: "QA", body: "テスト設計・自動化で品質を担保。日本品質を技術で支える要。" },
  { no: "04", title: "AI", body: "LLM・生成AI・AIエージェント。新規事業に挑むAIトランスフォーメーション。" },
];

// 資格取得支援制度（Canva「JQITのいろいろな数字」より）
export const qualifications = {
  intro:
    "推奨資格に合格した場合、受験費用を会社が負担。さらに一時報奨金と資格手当（月々）を支給します（金額は資格により異なる）。",
  byDomain: [
    {
      domain: "開発",
      items: [
        "ORACLE MASTER DBA（Bronze / Silver）",
        "Oracle Certified Java Programmer Silver SE 11",
        "ITパスポート / 基本情報技術者 / 応用情報技術者",
      ],
    },
    {
      domain: "インフラ",
      items: [
        "LinuC（レベル1〜3）",
        "CCNA",
        "AWS認定ソリューションアーキテクト / 専門知識",
      ],
    },
    {
      domain: "QA",
      items: [
        "IVEC（レベル1〜5）",
        "JSTQB Foundation Level",
        "JSTQB Advanced Level（テストアナリスト / テストマネージャー）",
      ],
    },
  ],
};

// 働く3つの理由
export const appeals = [
  { no: "01", title: "最新のIT・AI技術に挑める", body: "生成AI・LLMを中心とした最先端の案件と自社プロダクト。学びと挑戦が止まらない環境。" },
  { no: "02", title: "未経験歓迎、経験者歓迎", body: "育成と研修でポテンシャル層を後押し。経験者には裁量と、AI案件への入口を。" },
  { no: "03", title: "挑戦と革新の文化", body: "受託・自社サービス・AIコンサルと、新規事業へ踏み出すカルチャー。" },
];
