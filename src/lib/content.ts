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
  image?: string;
  imagePosition?: string;
  sourceUrl?: string;
  career?: string;
  title: string;
  excerpt: string;
  note?: string;
  reason?: string; // 入社のきっかけ
  work?: string; // いまの仕事
  growth?: string; // 成長と変化（Before→After）
  message?: string; // 挑戦するあなたへ
};

export type Faq = { q: string; a: string };
export type Stat = { value: string; unit: string; label: string };
export type FlowStep = { step: string; title: string; desc: string };

export const jobs: Job[] = jobsData as Job[];
export const interviews: Interview[] = interviewsData as Interview[];
export const faqs: Faq[] = faqData as Faq[];
export const stats: Stat[] = statsData as Stat[];
export const recruitFlow: FlowStep[] = flowData as FlowStep[];

export const jobCategoryValues = ["dev", "infra", "qa", "ai", "sales"] as const;
export type JobCategoryValue = (typeof jobCategoryValues)[number];

// slug ↔ フォームの希望職種value 対応
export const jobSlugToValue: Record<string, JobCategoryValue> = {
  engineer: "dev",
  infra: "infra",
  qa: "qa",
  ai: "ai",
  sales: "sales",
};

export const positionLabels: Record<JobCategoryValue, string> = {
  dev: "開発",
  infra: "インフラ",
  qa: "QA",
  ai: "AI",
  sales: "営業",
};

// 会社・ミッション・事業（Why JQIT）
export const company = {
  mission: "技術の力で、お客様の本質的な課題を解決する。",
  missionBody:
    "私たちは、単にシステムを開発する会社ではありません。お客様と共に走り、ビジネスを成功させるために本当に必要なことを考え抜きます。確かな技術力と、「使う人」を想う日本ならではの細やかな品質を掛け合わせ、社会に新しい価値を創造します。",
  values: [
    {
      title: "顧客の課題に踏み込む",
      body: "要件の手前から考え、事業に効く技術を届ける。",
    },
    {
      title: "チームで品質を上げる",
      body: "開発・インフラ・QA・AIが連携し、現場で孤立させない。",
    },
    {
      title: "AI・NOVAへ広がる",
      body: "SESで終わらず、受託・自社プロダクトにも挑戦できる。",
    },
  ],
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
    body: "AIマッチングと一元管理を強みとする、自社開発のSaaSプロダクト。受託に留まらず“自分たちのプロダクト”を持ち、AIで現場を変えています。",
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
    "AI・開発・インフラ・QA・共通領域まで、対象資格は30以上。推奨資格に合格した場合、受験費用を会社が負担し、資格に応じて一時報奨金と月々の資格手当を支給します。",
  highlights: ["対象資格30以上", "受験費用を会社負担", "一時報奨金", "月々の資格手当"],
  byDomain: [
    {
      domain: "AI",
      count: "4資格＋講座",
      focus: "生成AI・LLM・ディープラーニング",
      items: [
        "生成AIパスポート / GenerativeAI",
        "G検定 / E検定",
        "松尾研LLM講座",
      ],
    },
    {
      domain: "開発",
      count: "7資格",
      focus: "DB・Java・情報処理",
      items: [
        "ORACLE MASTER",
        "Java Silver",
        "基本情報 / 応用情報",
      ],
    },
    {
      domain: "インフラ",
      count: "10資格以上",
      focus: "Linux・ネットワーク・クラウド",
      items: [
        "LinuC",
        "CCNA",
        "AWS認定各種",
      ],
    },
    {
      domain: "QA",
      count: "9資格",
      focus: "テスト設計・品質・マネジメント",
      items: [
        "IVEC",
        "JSTQB",
        "JCSQE 初級",
      ],
    },
    {
      domain: "共通",
      count: "5資格",
      focus: "基礎力・業務運営",
      items: [
        "ITパスポート",
        "基本情報 / 応用情報",
        "衛生管理者",
      ],
    },
  ],
};

// 働く3つの理由
export const appeals = [
  { no: "01", title: "最新のIT・AI技術に挑める", body: "生成AI・LLMを中心とした最先端の案件と自社プロダクト。学びと挑戦が止まらない環境。" },
  { no: "02", title: "技術が、陳腐化しない", body: "会社が推奨技術を定め、習得を支援（受験費用全額＋資格手当）。客先のレガシーに縛られず、学び続けられる。" },
  { no: "03", title: "挑戦と革新の文化", body: "受託・自社サービス・AIコンサルと、新規事業へ踏み出すカルチャー。" },
];

// 進化するSES＝5つの武器（トップ核セクション #3）
// label=カテゴリ／headline=刺さる一文／body=実態。core=会社の本命（推奨技術＋習得支援）。
export type Weapon = {
  no: string;
  label: string;
  headline: string;
  body: string;
  core?: boolean;
};

export const weapons: Weapon[] = [
  {
    no: "01",
    label: "現場で孤立させない",
    headline: "ひとり任せで、終わらせない。",
    body: "案件や体制はさまざまでも、営業・上長・事業部とつながりながら現場に立つ。チーム参画の機会も活かし、経験者が次の役割へ進めるよう支えます。",
  },
  {
    no: "02",
    label: "推奨技術＋習得支援",
    headline: "技術が、陳腐化しない。",
    body: "会社が“伸ばす技術”（クロスプラットフォーム／IaC・CI/CD／QA自動化／AI駆動開発）を定め、習得を支援。スペシャルテクニカルボーナスと資格費用全額で、客先のレガシーにキャリアを預けない。",
    core: true,
  },
  {
    no: "03",
    label: "AI駆動開発を現場に",
    headline: "AIを、“使う側”で。",
    body: "Claude Code・Codexを実務で。社内業務にもAIエージェントを実装するAI駆動の会社。あなたの現場も、AIでアップデートする。",
  },
  {
    no: "04",
    label: "学びが報われる",
    headline: "学ぶほど、報われる。",
    body: "資格は受験費用を全額会社負担。合格時の一時報奨金と、月々の資格手当（最大6万円）。学び続ける人に、ちゃんと返る。",
  },
  {
    no: "05",
    label: "健全な働き方",
    headline: "健全に、長く働ける。",
    body: "みなし残業なし。副業OK。リモートも柔軟。消耗して使い捨てる働き方とは、はっきり違う。",
  },
];

// その先へ（upside／核B）。『全員が移れる』とは書かず、道が実在＋早期に担える、で正直に。
export const weaponsUpside = {
  lead: "そして、その先へ。",
  body: "SESで力をつけ、受託・自社AI（NOVA）へ。実際に移った人もいる。今はまだ少数だから——あなたが“次”を担える。",
};
