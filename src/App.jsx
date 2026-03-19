import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Menu, X, ExternalLink, ChevronRight, Triangle, Box } from 'lucide-react'

// ─── 데이터 ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'about',    label: 'About Me' },
  { id: 'lostark',  label: 'Featured: Lost Ark' },
  { id: 'history',  label: 'Professional History' },
  { id: 'personal', label: 'Personal Work' },
  { id: 'skills',   label: 'Technical Skills' },
  { id: 'awards',   label: 'Awards' },
]

const TECH_BADGES = ['C++', 'C#', 'Unreal', 'Unity', 'Perforce', 'Git', 'SVN', 'TeamCity']

const LOST_ARK_CONTRIBUTIONS = [
  {
    label: '보안 및 데이터 아키텍처',
    text: '리버스 엔지니어링을 통한 리소스 노출 및 변조 리스크를 차단하기 위해 클라이언트 사이드 DB 암/복호화 보안 시스템을 설계 및 구축했습니다. 이를 통해 게임의 핵심 데이터를 보호하고 서비스 보안성을 강화했습니다.',
  },
  {
    label: '인프라 대응 및 구조 분리',
    text: '대규모 신규 유입 대응을 위한 점프 서버 도입 시 기존 DB 구조의 한계를 해결하고자 클라이언트 DB를 독립적인 논리 계층으로 분리하고 데이터 마이그레이션을 수행하여, 서버 구조 변경에 유연하게 대응할 수 있는 아키텍처를 확보하고 서비스의 안정성을 유지했습니다. 또한 STOVE 플랫폼 연동 API 고도화와 서비스 전반의 안정화를 개선해 왔습니다.',
  },
  {
    label: '공정 자동화 및 협업 개선',
    text: '인게임 연출에 따른 가변 애니메이션 커서 시스템을 설계하고 리소스 파이프라인을 자동화로 대체함으로써, 수동 작업 비용을 제거하고 아트 및 개발 팀 간의 협업 생산성을 향상시켰습니다.',
  },
  {
    label: '글로벌 서비스 최적화',
    text: '전 세계 유저 동향 파악을 위해 QA 전용 다국어 로컬라이제이션 아키텍처를 설계하여, 다국어 환경의 텍스트 예외 상황을 사전에 검증할 수 있는 안정적인 테스트 기반을 마련했습니다.',
  },
  {
    label: '핵심 시스템 및 콘텐츠',
    text: "로스트아크의 주요 성장 시스템인 '초월' 컨텐츠의 클라이언트 아키텍처를 설계하고 복잡한 연출 로직을 최적화하여 고퀄리티 콘텐츠 출시를 이끌었습니다. 아울러 인/아웃게임을 아우르는 커스터마이징, IME(입력기), 웹 연동 등 필수 시스템의 유지보수 및 기능 고도화를 수행하며 라이브 환경에서의 안정적인 서비스 퀄리티를 지속적으로 향상해 왔습니다.",
  },
]

const NHN_ITEMS = [
  {
    studio: 'NHN RPG / NStudio',
    period: '2021.01 – 2021.07',
    project: '좀비 서바이벌 프로젝트',
    engine: 'unreal',
    status: '미출시',
    contributions: [
      {
        label: '무기 시스템 아키텍처',
        text: '능력치 설정에 따라 무기의 동작이 변화하는 무기 시스템 아키텍처를 설계하여 게임 플레이의 기획적 자유도를 높였습니다.',
      },
      {
        label: 'UMG 기반 콘텐츠 개발',
        text: 'UMG를 기반으로 인게임 콘텐츠 요소들을 개발하여 사용자 인터페이스의 완성도를 높였습니다.',
      },
    ],
  },
  {
    studio: 'NHN / PeachStudio',
    period: '2018.02 – 2020.12',
    project: 'Dr. Mario World',
    engine: 'unity',
    released: '글로벌 출시 (2019.07 · Android / iOS)',
    videoId: 'APZkk9qiXQI',
    contributions: [
      {
        label: '기믹 블록 시스템',
        text: '글로벌 런칭 프로젝트로서, 객체지향 프로그래밍의 추상화와 상속 구조를 적극 활용해 독립적으로 동작하는 35종의 고유 기믹 블록 시스템을 구축했습니다. 이를 통해 라이브 서비스 중에도 신속한 업데이트와 효율적인 유지보수가 가능한 기반을 마련했습니다.',
      },
      {
        label: '전용 레벨 에디터',
        text: '기획자가 직접 맵을 제작하고 즉시 시뮬레이션할 수 있는 WinForms 기반 전용 레벨 에디터를 개발하여 레벨 디자인 공정의 생산성을 획기적으로 제고했습니다.',
      },
    ],
  },
  {
    studio: 'NHN Blackpick / SM개발2팀',
    period: '2017.09 – 2018.02',
    project: '스포츠 모바일 (야구9단 & 풋볼데이)',
    engine: 'unity',
    status: '미출시',
    contributions: [
      {
        label: 'MVC 기반 UI 시스템',
        text: "자체 MVC 프레임워크인 'Taco'를 활용하여 대규모 데이터 기반의 스포츠 UI 시스템을 개발했습니다.",
      },
      {
        label: '2D 실시간 중계 시스템',
        text: 'JSON 스키마 설계를 통해 실시간 경기 데이터를 2D 경기 중계 시뮬레이션으로 시각화하는 시스템을 구축했습니다.',
      },
    ],
  },
]

const PERSONAL_WORK = [
  {
    year: '2021',
    projects: [
      {
        title: 'The Way',
        period: '2021.03 ~ 2021.05',
        engine: 'unreal',
        videoId: 'vusiw_7MrlU',
        desc: '언리얼 엔진 4의 프레임워크와 그래픽스 기능을 탐구하고자 Behavior Tree 기반의 지능형 상호작용 AI로 Material Function을 활용한 최적화된 연출 시스템을 설계하고 데이터 드리븐 방식으로 관리했습니다.',
        tags: ['C++', 'Behavior Tree', 'Shader'],
      },
    ],
  },
  {
    year: '2017',
    projects: [
      {
        title: 'Snakes-Server',
        period: '2017.04 ~ 2017.05',
        engine: 'unity',
        videoId: 'eDaiPUnFo5g',
        desc: '고성능 서버 아키텍처 학습을 위해 비동기 IOCP 모델과 TCP/UDP 혼합 통신을 직접 구현하고, 메모리 풀 및 원형 큐를 적용하여 동시 접속을 처리할 수 있는 안정적인 멀티플레이 환경을 구축했습니다.',
        tags: ['C++', 'IOCP', 'Network', 'Server'],
      },
    ],
  },
  {
    year: '2016',
    projects: [
      {
        title: 'LoAlto',
        period: '2016.03 ~ 2016.11',
        engine: 'unity',
        videoId: 'G69-5JAAZvM',
        desc: '14인 규모의 팀 프로젝트에서 군집 지능 알고리즘을 통한 드론 포위 시스템을 개발하고, FSM의 상태 전이를 패킷 단위로 동기화하여 끊김 없는 네트워크 멀티플레이 환경을 구현했습니다.',
        tags: ['C#', 'Swarm AI', 'Network', 'FSM'],
      },
      {
        title: 'WIP Simulation',
        period: '2016.09 ~ 2016.11',
        videoId: 'ocQsljHpRFo',
        desc: '물리 엔진의 핵심 원리를 파악하기 위해 GJK 및 EPA 알고리즘 기반의 정밀 충돌 검출 시스템을 직접 구축하고, RTTI를 활용한 컴포넌트 아키텍처를 설계하여 상용 엔진 도움 없이 강체 역학 시뮬레이션을 구현했습니다.',
        tags: ['C++', 'DirectX9', 'Physics Engine', 'GJK/EPA'],
      },
    ],
  },
  {
    year: '2014',
    projects: [
      {
        title: '그녀의 기사단',
        period: '2013.03 ~ 2014.02',
        videoId: 'agg7GCNxjPM',
        desc: 'C++ 기반의 코어 로직을 안드로이드와 iOS에서 공유할 수 있도록 NDK 크로스 플랫폼 환경을 구축하고, 자체 스크립트 파서를 설계하여 엔진 수정 없이 복잡한 게임 이벤트를 제어하는 유연한 구조를 완성했습니다.',
        tags: ['C++', 'NDK', 'OpenGL', 'Cross Platform', 'Script Engine'],
      },
      {
        title: 'CK4D',
        period: '2012.09 ~ 2014.02',
        videoId: 'LSXz3bLEXuA',
        desc: '2D 애니메이션의 효율적인 제작과 연출을 위해 정점 보간 기술과 스프링 물리 모델을 결합한 전용 엔진을 개발하고, 아틀라스 자동 생성 및 데이터 압축 파이프라인이 포함된 저작 툴을 구축했습니다.',
        tags: ['C++', 'OpenGL', 'MFC', 'Animation Engine', 'Tool'],
      },
    ],
  },
  {
    year: '2012',
    projects: [
      {
        title: '부스터 루스터',
        period: '2012.01 ~ 2012.06',
        videoId: 'LY5H2swNct8',
        desc: '플랫폼 독립적인 렌더링 환경 구축을 위해 HTML5 Canvas API로 직접 렌더링 루프를 구현하고, 화면 외 영역 오브젝트 컬링 기법을 적용하여 저사양 모바일 기기에서도 안정적인 성능을 확보했습니다.',
        tags: ['JavaScript', 'HTML5', 'Canvas', 'Optimization'],
      },
    ],
  },
]

const SKILLS = [
  { category: 'Languages',    items: ['C++', 'C#'] },
  { category: 'Game Engines', items: ['Unreal Engine', 'Unity'] },
  { category: 'Tools',        items: ['Visual Studio', 'Perforce', 'GitHub', 'SourceTree', 'SVN', 'TeamCity'] },
  { category: 'Professional', items: ['Software Architecture', 'Encryption / Security', 'Automation Tools', 'Global Live Service'] },
]

const AWARDS = [
  { title: '청강문화산업대학교 컴퓨터게임과 졸업', type: 'edu' },
  { title: '대한민국 앱 창작 경진대회 금상', org: '중소기업청', year: '2012', type: 'gold' },
  { title: 'HTML 앱 공모전 은상', org: '한국무선인터넷산업연합회', year: '2012', type: 'silver' },
  { title: '전국기능경기대회 게임개발 동메달', org: '국제기능올림픽대회', year: '2010', type: 'bronze' },
  { title: '경기지방기능경기대회 게임개발 금메달', org: '국제기능올림픽대회', year: '2010', type: 'gold' },
  { title: '경기지방기능경기대회 게임개발 동메달', org: '국제기능올림픽대회', year: '2009', type: 'bronze' },
]

// ─── 유틸 ───────────────────────────────────────────────────────────────────────

const ACCENT = '#34799e'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

// ─── 엔진 아이콘 ───────────────────────────────────────────────────────────────

function EngineIcon({ engine }) {
  if (engine === 'unreal') {
    return (
      <span
        title="Unreal Engine"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold text-white"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        {/* Unreal "U" 로고 */}
        <svg viewBox="0 0 20 20" width="13" height="13" fill="white">
          <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm.72 14.813c-.271.063-.548.094-.83.094-1.007 0-1.768-.268-2.283-.805-.515-.537-.773-1.322-.773-2.356V7.188h1.383v4.374c0 .735.152 1.275.457 1.621.305.346.76.52 1.367.52.215 0 .43-.027.645-.08.215-.053.41-.133.586-.24V7.188h1.383v7.344a5.7 5.7 0 01-.586.187 6.5 6.5 0 01-.35.094z"/>
        </svg>
        Unreal Engine
      </span>
    )
  }
  if (engine === 'unity') {
    return (
      <span
        title="Unity"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold text-white"
        style={{ backgroundColor: '#222c37' }}
      >
        {/* Unity 로고 */}
        <svg viewBox="0 0 20 20" width="13" height="13" fill="white">
          <path d="M10 0L0 5.774v8.452L10 20l10-5.774V5.774L10 0zm5.176 13.304l-5.175 2.99-5.177-2.99V6.696l5.177-2.99 5.175 2.99v6.608zm-5.175-9.6L4.824 6.695l1.943 1.121L10 5.826l3.233 1.99 1.943-1.121L10 3.704zm-4.352 8.6v-4.61L3.705 8.813v4.594L10 16.296v-2.243L5.648 12.304zm8.704 0L10 14.053v2.243l6.295-2.889V8.813l-1.943.881v4.61z"/>
        </svg>
        Unity
      </span>
    )
  }
  return null
}

// ─── 섹션 제목 ─────────────────────────────────────────────────────────────────

function SectionHeading({ children }) {
  return (
    <motion.div variants={fadeUp} className="mb-8">
      <h2 className="text-xl font-bold text-[#1a1a1a] tracking-tight">{children}</h2>
      <div className="mt-2 w-8 h-0.5" style={{ backgroundColor: ACCENT }} />
    </motion.div>
  )
}

// ─── YouTube 버튼 ──────────────────────────────────────────────────────────────

function YTBanner({ videoId, label }) {
  return (
    <a
      href={`https://youtu.be/${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-lg bg-black"
      style={{ aspectRatio: '16/6' }}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={label}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-300"
      />
      {/* 좌→우 그라디언트 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      {/* 재생 버튼 + 라벨 */}
      <div className="absolute inset-0 flex items-center gap-4 px-5">
        <div className="w-11 h-11 bg-red-600 group-hover:bg-red-500 rounded-full flex items-center justify-center shadow-lg shrink-0 transition-colors">
          <svg viewBox="0 0 16 16" fill="white" className="w-4 h-4 ml-0.5">
            <polygon points="4,2 14,8 4,14" />
          </svg>
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-snug drop-shadow">{label}</p>
          <p className="text-white/60 text-xs mt-0.5">Watch on YouTube</p>
        </div>
      </div>
    </a>
  )
}

// ─── 전체 배경 파티클 네트워크 ────────────────────────────────────────────────


// ─── 코드 파티클 캔버스 ────────────────────────────────────────────────────────

const CODE_SYMBOLS = [
  '{}', '()', '[];', '=>', '//', '&&', '||', '!= 0',
  'class', 'void', 'return', 'if()', 'for()', '::',
  'nullptr', '#include', 'std::', 'int*', 'UClass',
  'UFUNCTION()', '++i', 'bool', 'auto&', '<<', '>>',
  'new T()', 'delete', 'const&', 'FVector', 'TArray<>',
]

function CodeParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // 파티클 초기화
    const count = 38
    const particles = Array.from({ length: count }, () => ({
      x:      Math.random() * canvas.width,
      y:      Math.random() * canvas.height,
      vx:     (Math.random() - 0.5) * 0.3,
      vy:     -Math.random() * 0.4 - 0.1,
      alpha:  Math.random() * 0.45 + 0.2,
      size:   Math.random() * 4 + 12,
      symbol: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
      phase:  Math.random() * Math.PI * 2,     // 깜빡임 위상
      speed:  Math.random() * 0.008 + 0.004,   // 깜빡임 속도
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        // 위치 업데이트
        p.x += p.vx
        p.y += p.vy
        p.phase += p.speed

        // 화면 밖으로 나가면 반대편에서 재등장
        if (p.y < -20)          p.y = canvas.height + 20
        if (p.x < -60)          p.x = canvas.width + 60
        if (p.x > canvas.width + 60)  p.x = -60

        // 사인파로 opacity 부드럽게 변화
        const alpha = p.alpha * (0.5 + 0.5 * Math.sin(p.phase))

        ctx.save()
        ctx.font = `${p.size}px "JetBrains Mono", "Fira Code", monospace`
        ctx.fillStyle = `rgba(160, 210, 240, ${alpha})`
        ctx.fillText(p.symbol, p.x, p.y)
        ctx.restore()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

// ─── 상단 헤더 (프로필 + 네비게이션) ──────────────────────────────────────────

function Header({ activeSection, mobileMenuOpen, setMobileMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── 상단 프로필 영역 ── */}
      <div className="relative bg-[#1e2d3d] text-white overflow-hidden">
        <CodeParticleCanvas />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-14 text-center">
          {/* 아바타 */}
          <div
            className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center border-2 text-sm font-bold tracking-widest"
            style={{ backgroundColor: `${ACCENT}25`, borderColor: `${ACCENT}60`, color: ACCENT }}
          >
            Creataek
          </div>

          {/* 이름 */}
          <h1 className="text-4xl font-black tracking-tight text-white">임성택</h1>
          <p className="text-gray-300 text-base font-medium mt-1">Seong-taek Lim</p>
          <p className="text-[#34799e] text-base font-semibold mt-3">Game Client Developer · 10th Year</p>

          {/* 연락처 */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-6">
            <a
              href="mailto:ljslove119@naver.com"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              <Mail size={14} /> ljslove119@naver.com
            </a>
            <span className="text-gray-600">·</span>
            <a
              href="tel:01052235291"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              <Phone size={14} /> 010-5223-5291
            </a>
          </div>

          {/* 기술 배지 */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {TECH_BADGES.map(b => (
              <span
                key={b}
                className="px-3 py-1 text-xs font-semibold text-gray-200 bg-white/10 border border-white/20 rounded-full"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky 네비게이션 바 ── */}
      <div
        className={`sticky top-0 z-30 bg-[#1e2d3d] border-b border-white/10 transition-shadow ${
          scrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="max-w-4xl mx-auto px-6">
          {/* 데스크탑 nav */}
          <nav className="hidden md:flex items-center justify-center gap-1 h-12">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded text-xs font-medium transition-all ${
                  activeSection === item.id
                    ? 'text-white bg-white/10'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
                style={activeSection === item.id ? { color: ACCENT } : {}}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 모바일 nav */}
          <div className="md:hidden flex items-center justify-between h-12">
            <span className="text-white text-sm font-medium">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(p => !p)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 드롭다운 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden sticky top-12 z-20 bg-[#1e2d3d] border-b border-white/10 shadow-lg"
          >
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { scrollTo(item.id); setMobileMenuOpen(false) }}
                className={`w-full flex items-center gap-2 px-6 py-3 text-left text-sm border-b border-white/5 last:border-0 transition-colors ${
                  activeSection === item.id ? 'text-white bg-white/10' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <ChevronRight size={12} style={{ color: activeSection === item.id ? ACCENT : '#4b5563' }} />
                {item.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── 섹션 래퍼 ─────────────────────────────────────────────────────────────────

function Section({ id, children }) {
  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={stagger}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6"
    >
      {children}
    </motion.div>
  )
}

// ─── About Me ─────────────────────────────────────────────────────────────────

function About() {
  return (
    <Section id="about">
      <SectionHeading>About Me</SectionHeading>
      <motion.p variants={fadeUp} className="text-gray-700 text-sm leading-8 max-w-2xl">
        2017년부터 유니티와 언리얼 엔진을 통해 모바일/PC 글로벌 서비스를 성공적으로 이끌어온 개발자입니다.
        닌텐도 IP{' '}
        <span className="font-semibold" style={{ color: ACCENT }}>닥터 마리오 월드</span>의 초기 개발부터{' '}
        <span className="font-semibold" style={{ color: ACCENT }}>로스트아크</span>의 5년 라이브 서비스까지,
        시스템 설계와 안정성 확보에 특화된 역량을 보유하고 있습니다.
        단순히 코드를 짜는 것을 넘어, 동료의 목적과 입장을 이해하고 협업 효율을 만드는 팀워크 중심의 개발을 지향합니다.
      </motion.p>
    </Section>
  )
}

// ─── 공통 프로젝트 카드 ────────────────────────────────────────────────────────

function ProjectCard({ accentLabel, accentColor, borderColor, title, subtitle, meta, badge, badgeGreen, videoId, summary, contributions, engine }) {
  return (
    <div
      className="rounded-xl overflow-hidden border-2"
      style={{ borderColor: borderColor }}
    >
      {/* 라벨 바 */}
      <div className="flex items-center gap-2 px-5 py-2.5" style={{ backgroundColor: accentColor }}>
        <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
        <span className="text-white text-[11px] font-bold tracking-[0.15em] uppercase">{accentLabel}</span>
      </div>

      {/* 본문 */}
      <div className="p-6 bg-white">
        <div className="mb-4">
          <h3 className="text-[#1a1a1a] font-bold text-xl tracking-tight">{title}</h3>
          <p className="text-sm mt-0.5 font-medium" style={{ color: accentColor }}>{subtitle}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-2 text-xs text-gray-500">
            {meta.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
            {engine && <EngineIcon engine={engine} />}
            {badge && (
              <span className={`font-medium ${badgeGreen ? 'text-emerald-600' : 'text-gray-400'}`}>
                {badgeGreen ? '● ' : ''}{badge}
              </span>
            )}
          </div>
        </div>

        {summary && (
          <p className="text-gray-600 text-sm mb-4 pb-4 border-b border-gray-100">{summary}</p>
        )}

        {videoId && (
          <div className="mb-5">
            <YTBanner videoId={videoId} label={`${title} — YouTube`} />
          </div>
        )}

        <div className="space-y-4">
          {contributions.map((c, i) => (
            <div key={i} className="flex gap-4">
              <div
                className="shrink-0 w-0.5 rounded-full mt-1 self-stretch min-h-[1rem]"
                style={{ backgroundColor: accentColor }}
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: accentColor }}>
                  {c.label}
                </p>
                <p className="text-gray-700 text-sm leading-7">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Featured: Lost Ark ────────────────────────────────────────────────────────

function LostArk() {
  return (
    <Section id="lostark">
      <SectionHeading>Featured Experience</SectionHeading>
      <motion.div variants={fadeUp}>
        <ProjectCard
          accentLabel="Core Achievement"
          accentColor="#34799e"
          borderColor="#34799e"
          title="Lost Ark"
          subtitle="Smilegate RPG · Tripod Studio"
          meta={['2021.07 – 현재']}
          badge="라이브 서비스 중"
          badgeGreen
          videoId="jBspl-Am1eY"
          engine="unreal"
          summary="글로벌 대규모 라이브 서비스의 콘텐츠 개발 및 기술적 안정성 확보, 개발 공정 효율화"
          contributions={LOST_ARK_CONTRIBUTIONS}
        />
      </motion.div>
    </Section>
  )
}

// ─── Professional History ──────────────────────────────────────────────────────

const NHN_ACCENT = '#5a7a5a'

function NHNGroupCard() {
  return (
    <div className="rounded-xl overflow-hidden border-2" style={{ borderColor: NHN_ACCENT }}>
      {/* 그룹 헤더 바 */}
      <div className="flex items-center justify-between px-5 py-2.5" style={{ backgroundColor: NHN_ACCENT }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
          <span className="text-white text-[11px] font-bold tracking-[0.15em] uppercase">NHN Group</span>
        </div>
        <span className="text-white/70 text-[11px] font-mono">2017.09 – 2021.07</span>
      </div>

      {/* 서브 프로젝트 목록 */}
      <div className="bg-white divide-y divide-gray-100">
        {NHN_ITEMS.map((item, i) => (
          <div key={i} className="p-6">
            {/* 프로젝트 헤더 */}
            <div className="mb-4">
              <h3 className="text-[#1a1a1a] font-bold text-lg tracking-tight">{item.project}</h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-1.5 text-xs text-gray-500">
                <span className="font-medium text-gray-600">{item.studio}</span>
                <span>{item.period}</span>
                {item.engine && <EngineIcon engine={item.engine} />}
                {(item.released || item.status) && (
                  <span className={`font-medium ${item.released ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {item.released ? `● ${item.released}` : item.status}
                  </span>
                )}
              </div>
            </div>

            {item.videoId && (
              <div className="mb-4">
                <YTBanner videoId={item.videoId} label={`${item.project} — YouTube`} />
              </div>
            )}

            {/* 기여 내용 */}
            <div className="space-y-4">
              {item.contributions.map((c, j) => (
                <div key={j} className="flex gap-4">
                  <div
                    className="shrink-0 w-0.5 rounded-full mt-1 self-stretch min-h-[1rem]"
                    style={{ backgroundColor: NHN_ACCENT }}
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: NHN_ACCENT }}>
                      {c.label}
                    </p>
                    <p className="text-gray-700 text-sm leading-7">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function History() {
  return (
    <Section id="history">
      <SectionHeading>Professional History</SectionHeading>
      <div className="space-y-6">
        <motion.div variants={fadeUp}>
          <NHNGroupCard />
        </motion.div>
      </div>
    </Section>
  )
}

// ─── Technical Skills ──────────────────────────────────────────────────────────

// ─── Personal Work ────────────────────────────────────────────────────────────

// 태그 이름 → 일관된 색상 매핑
// 같은 프로젝트에 함께 등장하는 태그끼리는 색상이 겹치지 않도록 설계
const TAG_COLOR_MAP = {
  // 언어
  'C++':            'bg-blue-50 text-blue-700 border-blue-200',
  'C#':             'bg-violet-50 text-violet-700 border-violet-200',
  'JavaScript':     'bg-amber-50 text-amber-700 border-amber-200',
  // 네트워크 / 서버 (Snakes-Server: IOCP·Network·Server, LoAlto: Network·FSM)
  'IOCP':           'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Network':        'bg-sky-50 text-sky-700 border-sky-200',
  'Server':         'bg-green-50 text-green-700 border-green-200',
  'FSM':            'bg-teal-50 text-teal-700 border-teal-200',
  // AI / 행동
  'Swarm AI':       'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Behavior Tree':  'bg-cyan-50 text-cyan-700 border-cyan-200',
  // 그래픽스 (프로젝트별 단독 등장)
  'Shader':         'bg-rose-50 text-rose-700 border-rose-200',
  'OpenGL':         'bg-rose-50 text-rose-700 border-rose-200',
  'DirectX9':       'bg-rose-50 text-rose-700 border-rose-200',
  // 플랫폼 / 웹 (부스터루스터: JS·HTML5·Canvas·Optimization)
  'NDK':            'bg-amber-50 text-amber-700 border-amber-200',
  'Cross Platform': 'bg-orange-50 text-orange-700 border-orange-200',
  'HTML5':          'bg-orange-50 text-orange-700 border-orange-200',
  'Canvas':         'bg-sky-50 text-sky-700 border-sky-200',
  'Optimization':   'bg-green-50 text-green-700 border-green-200',
  // 아키텍처 / 자체 엔진 (프로젝트별 단독 등장)
  'Physics Engine':   'bg-violet-50 text-violet-700 border-violet-200',
  'GJK/EPA':          'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Animation Engine': 'bg-violet-50 text-violet-700 border-violet-200',
  'Script Engine':    'bg-violet-50 text-violet-700 border-violet-200',
  // 툴
  'MFC':  'bg-gray-100 text-gray-600 border-gray-300',
  'Tool': 'bg-teal-50 text-teal-700 border-teal-200',
}
const TAG_COLOR_DEFAULT = 'bg-gray-100 text-gray-600 border-gray-300'

// 태그 정렬: 언어 먼저, 그다음 나머지 원래 순서 유지
const LANG_TAGS = new Set(['C++', 'C#', 'JavaScript'])
function sortTags(tags) {
  const langs = tags.filter(t => LANG_TAGS.has(t))
  const rest  = tags.filter(t => !LANG_TAGS.has(t))
  return [...langs, ...rest]
}

function PersonalWork() {
  return (
    <Section id="personal">
      <SectionHeading>Personal Work</SectionHeading>
      <motion.p variants={fadeUp} className="text-gray-500 text-sm mb-8 -mt-4 leading-relaxed">
        상용 엔진 활용 능력뿐만 아니라, 게임 엔진의 핵심 메커니즘과 서버 아키텍처를 깊이 있게 탐구하며 기술적 기초를 다져온 프로젝트들입니다.
      </motion.p>

      <div className="space-y-10">
        {PERSONAL_WORK.map((group) => (
          <motion.div key={group.year} variants={fadeUp}>
            {/* 연도 헤더 */}
            <div className="flex items-center gap-4 mb-3">
              <span className="text-lg font-black text-[#34799e]">{group.year}</span>
              <hr className="flex-1 border-t border-gray-200" />
            </div>

            {/* 해당 연도 프로젝트 목록 */}
            <div className="space-y-6 pl-1">
              {group.projects.map((proj, i) => (
                <div key={i} className="flex gap-4">
                  {/* 타임라인 dot */}
                  <div className="flex flex-col items-center pt-1.5">
                    <div className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                    {i < group.projects.length - 1 && (
                      <div className="w-px flex-1 bg-gray-100 mt-1.5" />
                    )}
                  </div>

                  <div className="flex-1 pb-1">
                    {/* 제목 + 기간 */}
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                      <h3 className="text-gray-900 font-bold text-base">{proj.title}</h3>
                      <span className="text-gray-400 text-xs font-mono">{proj.period}</span>
                    </div>

                    {/* 엔진 아이콘 + 태그 배지 */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      {proj.engine && <EngineIcon engine={proj.engine} />}
                      {sortTags(proj.tags).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 text-[11px] font-semibold rounded border ${TAG_COLOR_MAP[tag] ?? TAG_COLOR_DEFAULT}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* YouTube 배너 */}
                    {proj.videoId && (
                      <div className="mb-3">
                        <YTBanner videoId={proj.videoId} label={`${proj.title} — YouTube`} />
                      </div>
                    )}

                    {/* 설명 */}
                    <p className="text-gray-600 text-sm leading-7">{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills">
      <SectionHeading>Technical Skills</SectionHeading>
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-7">
        {SKILLS.map(({ category, items }) => (
          <motion.div key={category} variants={fadeUp}>
            <p className="text-gray-500 text-[11px] uppercase tracking-widest font-medium mb-3">
              {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg hover:border-[#34799e]/60 hover:text-[#34799e] transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

// ─── Awards & Education ────────────────────────────────────────────────────────

const MEDAL_STYLE = {
  edu:    { dot: '#34799e' },
  gold:   { dot: '#c49a2a' },
  silver: { dot: '#9ca3af' },
  bronze: { dot: '#c0703a' },
}

function Awards() {
  return (
    <Section id="awards">
      <SectionHeading>Awards & Education</SectionHeading>
      <div className="space-y-3">
        {AWARDS.map((a, i) => {
          const s = MEDAL_STYLE[a.type]
          return (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-center gap-4 px-4 py-3.5 rounded-lg border border-gray-200 bg-gray-50"
            >
              {/* 메달 색상 dot */}
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: s.dot }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                {a.org && <p className="text-gray-500 text-xs mt-0.5">{a.org}</p>}
              </div>
              {a.year && (
                <span className="text-gray-500 text-xs shrink-0 font-mono">{a.year}</span>
              )}
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection]   = useState('about')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Header
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <About />
        <LostArk />
        <History />
        <PersonalWork />
        <Skills />
        <Awards />
        <footer className="text-center py-6">
          <p className="text-gray-400 text-xs">© 2026 Seong-taek Lim · Game Client Developer</p>
        </footer>
      </main>
    </div>
  )
}
