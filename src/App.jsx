import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Menu, X, ExternalLink, ChevronRight, Triangle, Box } from 'lucide-react'

// ─── 데이터 ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'about',      label: 'About Me' },
  { id: 'work',       label: 'Work Experience' },
  { id: 'personal',   label: 'Personal Work' },
  { id: 'skills',     label: 'Technical Skills' },
  { id: 'awards',     label: 'Awards' },
  { id: 'activities', label: 'Activities' },
  { id: 'contact',    label: 'Contact' },
]


const LOST_ARK_CONTRIBUTIONS = [
  {
    label: '핵심 시스템 및 콘텐츠',
    text: "인·아웃게임을 아우르는 다양한 콘텐츠 개발을 담당하고 제작 효율을 위한 툴 개발, 웹 연동, IME(입력기) 등 기반 시스템의 유지보수와 고도화를 수행하며 라이브 서비스 전반의 품질 확보에 기여했습니다. 또한 클라이언트 실행 시 발생하는 수초 간의 프리징 현상과 담당 콘텐츠의 시스템 병목 지점을 진단·개선하여 성능을 최적화했으며, 로스트아크 '초월' 시스템의 클라이언트 아키텍처 설계와 개발 전반을 리딩하여 안정적인 콘텐츠 출시를 완수했습니다.",
    highlights: ["수초 간의 프리징 현상과 시스템 병목 지점을 진단·개선하여 성능을 최적화", "'초월' 시스템의 클라이언트 아키텍처 설계와 개발 전반을 리딩"],
  },
  {
    label: '보안 및 데이터 아키텍처',
    text: '리버스 엔지니어링을 통한 리소스 노출 및 변조 리스크를 방어하기 위해 클라이언트 사이드 DB 암/복호화 보안 시스템을 설계 및 구축했습니다. 이를 통해 핵심 데이터를 보호하고 게임 전반의 서비스 보안성을 강화했습니다.',
    highlights: ['클라이언트 사이드 DB 암/복호화 보안 시스템을 설계 및 구축'],
  },
  {
    label: '데이터 레이어 분리 및 플랫폼 고도화',
    text: "대규모 신규 유입 대응을 위한 '점프 서버' 도입 시, 기존 DB 구조의 한계를 해결하고자 클라이언트 DB를 독립적인 논리 계층으로 분리했습니다. 데이터 마이그레이션을 안정적으로 수행하여 서버 구조 변경에 유연하게 대응할 수 있는 아키텍처를 확보했으며, STOVE 플랫폼 API 고도화를 통해 서비스 전반을 안정화했습니다.",
    highlights: ['클라이언트 DB를 독립적인 논리 계층으로 분리', 'STOVE 플랫폼 API 고도화'],
  },
  {
    label: '공정 자동화 및 협업 개선',
    text: '인게임 연출과 연동되는 가변 애니메이션 커서 시스템을 설계하고, 반복적인 리소스 파이프라인을 자동화로 대체했습니다. 이를 통해 수동 작업 비용을 제거하고 아트 및 개발 팀 간의 실질적인 협업 생산성을 높였습니다.',
    highlights: ['가변 애니메이션 커서 시스템', '리소스 파이프라인을 자동화'],
  },
  {
    label: '글로벌 서비스 고도화',
    text: '전 세계 유저 동향 파악을 위해 QA 전용 다국어 로컬라이제이션 아키텍처를 설계하여, 다국어 환경의 텍스트 예외 상황을 사전에 검증할 수 있는 안정적인 테스트 기반을 마련했습니다.',
    highlights: ['QA 전용 다국어 로컬라이제이션 아키텍처를 설계'],
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
        highlights: ['무기 시스템 아키텍처를 설계'],
      },
      {
        label: 'UMG 기반 콘텐츠 개발',
        text: 'UMG를 기반으로 인게임 콘텐츠 요소들을 개발하여 사용자 인터페이스의 완성도를 높였습니다.',
        highlights: ['UMG를 기반으로 인게임 콘텐츠 요소들을 개발'],
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
        highlights: ['35종의 고유 기믹 블록 시스템을 구축'],
      },
      {
        label: 'UGUI 기반 콘텐츠 개발',
        text: '다양한 인게임 요소들을 UGUI 시스템 내에 효율적으로 구조화하여, 인터페이스의 시각적 완성도와 콘텐츠 서비스의 안정성을 확보했습니다.',
        highlights: ['UGUI 시스템 내에 효율적으로 구조화'],
      },
      {
        label: '전용 레벨 에디터',
        text: '기획자가 직접 맵을 제작하고 즉시 시뮬레이션할 수 있는 WinForms 기반 전용 레벨 에디터를 개발하여 레벨 디자인 공정의 생산성을 획기적으로 제고했습니다.',
        highlights: ['WinForms 기반 전용 레벨 에디터를 개발'],
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
        text: "자체 MVC 프레임워크인 'Taco'를 활용하여 데이터 기반의 스포츠 UI 시스템을 개발했습니다.",
        highlights: ["'Taco'를 활용하여 데이터 기반의 스포츠 UI 시스템을 개발"],
      },
      {
        label: '2D 실시간 중계 시스템',
        text: 'JSON 스키마 설계를 통해 실시간 경기 데이터를 2D 경기 중계 시뮬레이션으로 시각화하는 시스템을 구축했습니다.',
        highlights: ['실시간 경기 데이터를 2D 경기 중계 시뮬레이션으로 시각화'],
      },
    ],
  },
]

const PERSONAL_WORK = [
  {
    year: '2022',
    accent: '#7a5a9a',
    projects: [
      {
        id: 'vr-tooth-brushing',
        title: 'VR Tooth Brushing',
        period: '2022.01 ~ 2022.03',
        engine: 'unreal',
        images: ['/VRToothBrush.png', '/VRToothBrush2.png'],
        desc: '언리얼 엔진 4 기반의 VR 양치질 교육 시뮬레이션입니다. Motion Controller와 칫솔 간의 커스텀 콜리전 채널로 치석 제거 인터랙션을 구현하고, Custom Stencil 기반 아웃라인으로 상호작용 오브젝트를 강조했습니다.',
        tags: ['VR', 'Shader'],
      },
    ],
  },
  {
    year: '2021',
    accent: '#4a6aaa',
    projects: [
      {
        id: 'the-way',
        title: 'The Way',
        period: '2021.03 ~ 2021.05',
        engine: 'unreal',
        videoId: 'vusiw_7MrlU',
        desc: '언리얼 엔진 4의 프레임워크를 탐구하고자 순수 C++로 구현한 캐릭터 액션 게임 프로토타입입니다. 컴포넌트 기반 캐릭터 아키텍처, BTTask·BTDecorator·BTService를 직접 구현한 Behavior Tree AI, AnimNotify 기반 애니메이션 동기화, 템플릿 특수화를 활용한 타입 안전 데이터 관리 시스템을 설계했습니다.',
        tags: ['C++', 'Behavior Tree'],
      },
      {
        id: 'genetic-glass',
        title: 'MorphSeed',
        period: '2021.08 ~ 2021.11',
        engine: 'unity',
        videoId: 'Ba-YKMXSdtQ',
        desc: '유전 알고리즘 원리를 적용한 인터랙티브 생성 아트 시뮬레이션입니다. 11종의 베이스 메시에서 3개를 선택해 660가지 진화 조합을 사전 연산하고, 들로네 삼각분할로 절차적 스켈레톤과 메시를 생성하여 SkinnedMeshRenderer 기반의 실시간 형태 진화를 구현했습니다.',
        tags: ['C#', 'Procedural Mesh', 'Generative Art'],
      },
    ],
  },
  {
    year: '2017',
    accent: '#4a8a62',
    projects: [
      {
        id: 'snakes-server',
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
    accent: '#9a6a38',
    projects: [
      {
        id: 'loalto',
        title: 'LoAlto',
        period: '2016.03 ~ 2016.11',
        engine: 'unity',
        videoId: 'G69-5JAAZvM',
        desc: '14인 규모의 팀 프로젝트에서 군집 지능 알고리즘을 통한 드론 포위 시스템을 개발하고, FSM의 상태 전이를 패킷 단위로 동기화하여 끊김 없는 네트워크 멀티플레이 환경을 구현했습니다.',
        tags: ['C#', 'Swarm AI', 'Network', 'FSM'],
      },
      {
        id: 'wip-simulation',
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
    accent: '#6a5a9a',
    projects: [
      {
        id: 'knighthood',
        title: '그녀의 기사단',
        period: '2013.03 ~ 2014.02',
        videoId: 'agg7GCNxjPM',
        desc: 'C++ 기반의 코어 로직을 안드로이드와 iOS에서 공유할 수 있도록 NDK 크로스 플랫폼 환경을 구축하고, 자체 스크립트 파서를 설계하여 엔진 수정 없이 복잡한 게임 이벤트를 제어하는 유연한 구조를 완성했습니다.',
        tags: ['C++', 'NDK', 'OpenGL', 'Cross Platform', 'Script Engine'],
      },
      {
        id: 'ck4d',
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
    accent: '#2a8a84',
    projects: [
      {
        id: 'booster-rooster',
        title: '부스터 루스터',
        period: '2012.01 ~ 2012.06',
        videoId: 'LY5H2swNct8',
        desc: '플랫폼 독립적인 렌더링 환경 구축을 위해 HTML5 Canvas API로 직접 렌더링 루프를 구현하고, 화면 외 영역 오브젝트 컬링 기법을 적용하여 저사양 모바일 기기에서도 안정적인 성능을 확보했습니다.',
        tags: ['JavaScript', 'HTML5', 'Canvas', 'Optimization'],
      },
    ],
  },
]

const PERSONAL_WORK_DETAILS = {
  'vr-tooth-brushing': {
    title: 'VR Tooth Brushing',
    period: '2022.01 ~ 2022.03',
    engine: 'unreal',
    images: ['/VRToothBrush.png', '/VRToothBrush2.png'],
    tags: ['VR', 'Shader', 'Optimization'],
    accent: '#7a5a9a',
    overview: '언리얼 엔진 4 기반의 VR 양치질 교육 시뮬레이션입니다. Motion Controller로 칫솔을 조작해 치아 표면의 치석을 제거합니다. 칫솔·치석·구강 경계 간의 충돌 판정을 오브젝트 타입별 커스텀 콜리전 채널로 분리 설계하고, Custom Stencil 기반 아웃라인으로 상호작용 가능한 오브젝트를 시각적으로 강조했습니다.',
    sections: [
      {
        title: 'VR 인터랙션 & 커스텀 콜리전 시스템',
        content: 'Motion Controller의 움직임을 칫솔에 1:1로 매핑하여 직관적인 VR 인터랙션을 구현했습니다. 칫솔·치석·구강 경계 각각의 충돌 판정을 독립적인 커스텀 콜리전 채널로 분리하고, 구강 경계 전용 채널로 칫솔의 이동 가능 범위를 물리적으로 제한해 관통을 방지했습니다. 치아 표면의 32개 이상 치석 인스턴스를 개별 관리하며, 칫솔 접촉 이벤트마다 제거 상태를 갱신해 세밀한 양치 진행도를 추적합니다.',
      },
      {
        title: 'Custom Stencil 기반 아웃라인',
        content: '강조할 오브젝트에 고유 Stencil ID를 부여하고 렌더링 시 별도의 Stencil 버퍼에 기록합니다. 이후 포스트 프로세스 패스에서 인접 픽셀의 Stencil ID를 비교해 경계 픽셀에만 아웃라인 색상을 출력합니다. 메시를 추가로 그리지 않고 스크린 스페이스에서 경계를 감지하므로, 드로우 콜 증가 없이 오브젝트가 겹쳐도 정확한 실루엣 아웃라인을 렌더링할 수 있습니다.',
      },
    ],
  },
  'the-way': {
    title: 'The Way',
    period: '2021.03 ~ 2021.05',
    videoId: 'vusiw_7MrlU',
    engine: 'unreal',
    tags: ['C++', 'Behavior Tree'],
    accent: '#4a6aaa',
    overview: '언리얼 엔진 4의 내부 프레임워크를 직접 탐구하기 위해 Blueprint 없이 순수 C++로 구현한 캐릭터 액션 게임 프로토타입입니다. 캐릭터 생애주기 전반(스폰 → 전투 → 사망 → 아이템 드롭)을 컴포넌트 기반으로 설계하고, Behavior Tree AI·애니메이션 시스템·데이터 관리 구조까지 직접 구축하며 엔진의 동작 원리를 깊이 있게 이해하는 것을 목표로 했습니다.',
    sections: [
      {
        title: '컴포넌트 기반 캐릭터 아키텍처',
        content: 'ABaseCharacter를 중심으로 스탯 관리(UCharacterStatComponent), 무기 처리(AWeaponBase), 애니메이션 제어(UBaseAnimInstance)를 독립적인 컴포넌트로 분리했습니다. 캐릭터 데이터는 FCharacterData 구조체로 정의해 데이터와 로직을 명확히 분리했으며, 전투 시스템에서는 콤보 어택 타이밍 판정, 피격 시 머티리얼 이펙트·사운드 처리, 사망 시 드롭 아이템 처리까지 생애주기 전반을 구현했습니다.',
      },
      {
        title: 'Behavior Tree 기반 AI 설계',
        content: 'BTTask, BTDecorator, BTService를 직접 구현해 Behavior Tree를 커스터마이징했습니다. ABaseAIController가 트리를 관리하며, 조건 노드와 행동 노드를 계층적으로 구성해 상황에 따라 유연하게 반응하는 NPC 행동 패턴을 구현했습니다. Blackboard를 통한 상태 공유로 복잡한 판단 흐름을 명확하게 정리했습니다.',
      },
      {
        title: '애니메이션 시스템 & 데이터 관리',
        content: 'UBaseAnimInstance에 AnimNotify와 AnimNotifyState를 커스텀 구현해 게임플레이 이벤트를 애니메이션 타임라인과 정밀하게 동기화했습니다. 데이터 관리 측면에서는 템플릿 기반의 UDataTableManager를 설계해 다양한 데이터 타입을 타입 안전하게 처리할 수 있도록 했으며, FWeaponStatsData처럼 Id와 Level을 복합 키로 활용하는 구조도 템플릿 특수화로 유연하게 지원했습니다.',
      },
    ],
  },
  'genetic-glass': {
    title: 'MorphSeed',
    period: '2021.08 ~ 2021.11',
    engine: 'unity',
    videoId: 'Ba-YKMXSdtQ',
    tags: ['C#', 'Procedural Mesh', 'Generative Art'],
    accent: '#4a6aaa',
    overview: '유전 알고리즘 원리를 시각화한 인터랙티브 생성 아트 시뮬레이션입니다. 11종의 베이스 메시 모델에서 3개를 무작위로 선택해 교배하는 방식으로 생명체가 실시간으로 형태를 진화시킵니다. 버텍스 분포 기반의 절차적 스켈레톤 생성, 들로네 삼각분할을 이용한 메시 위상 구성, SkinnedMeshRenderer 기반의 실시간 형태 보간까지 메시 변환의 전 과정을 직접 구현했습니다.',
    sections: [
      {
        title: '유전적 진화 시스템',
        content: '3개의 부모 메시를 선택하고 각 버텍스 위치를 선형 보간해 자식 형태를 계산하는 방식으로 유전 교배를 구현했습니다. 11종 모델에서 가능한 165가지(C(11,3)) 조합은 앱 초기화 시 사전 연산 후 이진 직렬화로 디스크에 캐시하며, 런타임에는 파일 로드만으로 즉시 사용합니다. 각 생명체는 60초 주기로 진화를 트리거하고 3,600초에 걸쳐 목표 형태로 수렴합니다.',
      },
      {
        title: '절차적 스켈레톤 생성 & 들로네 삼각분할',
        content: '사전 정의된 리그 없이 버텍스를 Z축 기준으로 정렬하고 클러스터로 분할해 가중 평균 위치에 본을 자동 배치합니다. 본 사이의 메시 공백은 MIConvexHull 라이브러리의 3D 들로네 삼각분할로 채웁니다. 들로네 삼각분할은 생성되는 삼각형의 최소 내각을 최대화하는 성질을 가져, 가늘고 긴 슬리버(sliver) 삼각형 없이 균일한 삼각망을 보장합니다. 이후 각 버텍스에서 가장 가까운 본까지의 거리를 기반으로 BoneWeight를 계산해 SkinnedMeshRenderer를 런타임에 직접 갱신합니다.',
      },
      {
        title: '매니저 패턴 아키텍처 & 자율 행동',
        content: '싱글턴 기반 매니저 시스템으로 시스템 간 의존성을 명시적으로 관리합니다. 각 생명체는 CoMovement 코루틴으로 독립 자율 이동하며, 활동 범위를 벗어나면 내측으로 방향을 전환하는 경계 처리를 적용했습니다. Unity Animation Rigging의 DampedTransform으로 급격한 스켈레탈 변화를 부드럽게 완충합니다.',
      },
    ],
  },
  'snakes-server': {
    title: 'Snakes-Server',
    period: '2017.04 ~ 2017.05',
    videoId: 'eDaiPUnFo5g',
    engine: 'unity',
    tags: ['C++', 'IOCP', 'Network', 'Server'],
    accent: '#4a8a62',
    overview: '고성능 서버 아키텍처의 핵심 원리를 직접 구현하며 이해하기 위해 진행한 프로젝트입니다. 비동기 I/O 모델과 메모리 최적화 기법을 적용해 다수의 동시 접속을 안정적으로 처리하는 멀티플레이 서버 환경을 구축했습니다.',
    sections: [
      {
        title: 'IOCP 비동기 서버',
        content: 'Windows IOCP(I/O Completion Port) 모델을 직접 구현해 비동기 네트워크 I/O를 처리했습니다. 스레드 풀과 결합하여 다수의 클라이언트 요청을 효율적으로 분배하는 구조를 설계했으며, 블로킹 없이 대량의 동시 접속을 처리할 수 있는 기반을 마련했습니다.',
      },
      {
        title: 'TCP/UDP 혼합 통신',
        content: '신뢰성이 요구되는 데이터는 TCP로, 실시간성이 중요한 데이터는 UDP로 처리하는 혼합 통신 구조를 구현했습니다. 게임 데이터 특성에 맞게 프로토콜을 분리함으로써 안정적인 상태 동기화와 빠른 위치 업데이트를 동시에 달성했습니다.',
      },
      {
        title: '메모리 최적화',
        content: '메모리 풀(Memory Pool)을 직접 구현해 빈번한 동적 할당에 따른 오버헤드를 제거했습니다. 원형 큐(Circular Queue)를 활용한 패킷 버퍼 관리로 데이터 처리 효율을 높이고, 메모리 단편화 없이 안정적인 패킷 송수신 환경을 확보했습니다.',
      },
    ],
  },
  'loalto': {
    title: 'LoAlto',
    period: '2016.03 ~ 2016.11',
    videoId: 'G69-5JAAZvM',
    engine: 'unity',
    tags: ['C#', 'Swarm AI', 'Network', 'FSM'],
    accent: '#9a6a38',
    overview: '프로그래머 3인·기획자 3인·그래픽 8인, 총 14인 팀의 졸업작품입니다. 저항군이 점령한 탑을 탈환하는 2인 협동 네트워크 TPS 게임으로, 몬스터 AI 설계와 포위 시스템 개발을 담당했습니다.',
    sections: [
      {
        title: 'FSM 기반 네트워크 AI 동기화',
        content: '두 클라이언트 간 AI 상태를 일관되게 유지하기 위해 FSM(Finite State Machine) 기반 네트워크 동기화 구조를 설계했습니다. 방장 클라이언트만이 상태 전이 조건을 검사하며, 전이 조건 발동 시 즉시 행동하지 않고 서버로 상태 변경 패킷을 전송합니다. 이후 서버에서 양쪽 클라이언트에 동시 전달되면 그때 상태를 전이해 두 클라이언트의 AI 행동이 항상 동기화되도록 구현했습니다.',
      },
      {
        title: '드론 AI — 군집 비행 및 장애물 회피',
        content: '부엉이 크리처가 적군을 감지하면 공격용 드론을 생산합니다. 드론은 지정된 지점을 선회하며 공격 범위 내 적을 공격하는 동시에, 선회 중 주변 오브젝트와의 충돌을 방지하기 위해 다방향 Ray를 발사해 환경을 감지합니다. 장애물이 탐지되면 속도를 줄이며 회피 방향으로 방향벡터를 전환하는 동적 회피 시스템을 구현했습니다.',
      },
      {
        title: '포위 AI 시스템 (Siege System)',
        content: '병사들이 플레이어를 발견하면 자동으로 포위 진형을 구성하는 군집 AI 시스템입니다. 타겟 기준 8방향 Ray를 발사해 주변 지형 정보를 수집하고, 가중치 기반 알고리즘으로 최적의 포위 방향을 계산합니다. 병사 종류(방패병·일반병)에 따라 포위 거리와 그룹이 분리되며, 동일 방향의 병사들을 포위 그룹으로 동적으로 묶어 대장 중심의 원형 진형을 형성합니다. 플레이어 이동에 따라 매 순간 포위 방향을 재계산해 끊임없이 갱신되는 포위 구조를 구현했습니다.',
      },
    ],
  },
  'wip-simulation': {
    title: 'WIP Simulation',
    period: '2016.09 ~ 2016.11',
    videoId: 'ocQsljHpRFo',
    engine: null,
    tags: ['C++', 'DirectX9', 'Physics Engine', 'GJK/EPA'],
    accent: '#9a6a38',
    overview: 'Unity3D·Unreal 등 상용 엔진이 제공하는 물리 기능이 실제로 어떻게 구현되는지 직접 탐구하기 위해 진행한 프로젝트입니다. 강체 역학 시뮬레이션을 목표로, Unity3D의 컴포넌트 기반 설계를 참고해 아키텍처를 직접 구성하고 충돌 감지와 물리 연산을 구현했습니다.',
    sections: [
      {
        title: '컴포넌트 기반 아키텍처',
        content: 'Base 컴포넌트를 상속해 나머지 컴포넌트를 확장하는 구조를 설계했습니다. 게임 오브젝트는 컴포넌트 테이블을 보유하며, 필요한 컴포넌트만 조합해 Plane, Sphere, Cube 등 다양한 오브젝트를 구성할 수 있습니다. Unity3D 엔진의 컴포넌트 시스템을 참고해 유연하고 확장 가능한 구조로 설계했습니다.',
      },
      {
        title: '커스텀 RTTI 시스템',
        content: '컴포넌트를 식별하고 관리하기 위한 커스텀 RTTI(Run-Time Type Identification) 시스템을 구현했습니다. DeclareRTTI / ImplementRTTI 매크로로 각 컴포넌트에 식별자·상속 정보·유일성(unique) 여부를 부여합니다. unique 컴포넌트는 부모 계층을 탐색해 최상위 타입 이름으로 등록되며, 상속 관계에 무관하게 오브젝트당 하나만 존재하도록 보장합니다.',
      },
      {
        title: 'GJK 충돌 감지',
        content: '민코프스키 차(Minkowski Difference)를 기반으로 두 도형 간의 충돌 여부를 판단하는 GJK(Gilbert–Johnson–Keerthi) 알고리즘을 구현했습니다. 두 도형의 민코프스키 차로 구성된 사면체(Simplex)가 원점을 포함하면 충돌로 판정합니다. GJKSimplexUpdate 함수에서 사면체 내 원점 포함 여부를 반복 검사하며 정밀한 충돌 감지를 수행합니다.',
      },
      {
        title: 'EPA 충돌 정보 계산',
        content: 'GJK로 충돌 여부를 확인한 후, EPA(Expanding Polytope Algorithm)를 통해 충돌 깊이와 방향을 계산합니다. GJK에서 생성된 폴리토프를 시작점으로 민코프스키 차 내에서 도형을 점진적으로 확장하며 원점에 가장 가까운 면을 탐색합니다. 탐색된 면과 원점 간의 거리와 방향이 최종 충돌 깊이와 충돌 방향 벡터가 됩니다.',
      },
    ],
  },
  'knighthood': {
    title: '그녀의 기사단',
    period: '2013.03 ~ 2014.02',
    videoId: 'agg7GCNxjPM',
    engine: null,
    tags: ['C++', 'NDK', 'OpenGL', 'Cross Platform', 'Script Engine'],
    accent: '#6a5a9a',
    overview: '별바람 스튜디오에서 2인이 진행한 모바일 게임 프로젝트입니다. Android와 iOS를 동시에 지원하기 위해 NDK 기반 C++ 코어 로직을 공유하는 구조를 설계했으며, CK4D 저작 도구로 제작한 모션 데이터를 게임에 직접 적용했습니다.',
    sections: [
      {
        title: '크로스 플랫폼 NDK 구조',
        content: 'Android와 iOS 양 플랫폼을 하나의 C++ 코드베이스로 지원하기 위해 NDK 크로스 플랫폼 환경을 구축했습니다. 플랫폼 종속적인 부분을 추상 레이어로 분리하고, OpenGL 기반 렌더링 파이프라인을 공유함으로써 코드 중복을 최소화하고 유지보수성을 확보했습니다.',
      },
      {
        title: '커스텀 스크립트 시스템',
        content: '게임 이벤트를 엔진 수정 없이 외부에서 정의하고 제어하기 위해 세 종류의 스크립트 시스템을 설계했습니다. 캐릭터 스크립트와 데이터 스크립트는 문자열 파싱으로 값을 주입하며, 액션 스크립트는 조건문·변수 선언·명령어 중첩을 지원하는 커스텀 파서를 통해 복잡한 게임 이벤트 흐름을 외부 텍스트 파일로 완전히 제어할 수 있도록 구현했습니다.',
      },
      {
        title: 'CK4D 모션 연동',
        content: 'CK4D 저작 도구에서 생성한 .stnr / .anr 파일을 런타임에 파싱해 캐릭터 애니메이션을 재생합니다. 프레임 간 보간 처리를 통해 부드러운 모션을 구현했으며, 스프링 물리가 적용된 레이어는 로컬 축의 움직임에 따라 실시간으로 반응하도록 연동했습니다.',
      },
    ],
  },
  'ck4d': {
    title: 'CK4D',
    period: '2012.09 ~ 2014.02',
    videoId: 'LSXz3bLEXuA',
    engine: null,
    tags: ['C++', 'OpenGL', 'MFC', 'Animation Engine', 'Tool'],
    accent: '#6a5a9a',
    overview: '별바람 스튜디오에서 2인이 개발한 2D 애니메이션 저작 도구입니다. 스프라이트·일러스트 등 2D 이미지를 레이어 단위로 편집하고 물리 기반 모션을 제작할 수 있으며, 제작된 데이터는 그녀의 기사단 개발에 실제로 사용되었습니다.',
    sections: [
      {
        title: '레이어 시스템',
        content: '이미지 하나를 다수의 정점으로 구성된 레이어로 표현하며, 각 정점의 위치와 UV 좌표를 독립적으로 편집할 수 있습니다. 옷자락·머리카락 등 유동적인 부위에는 스프링 물리를 적용해 모션 재생 시 로컬 축의 움직임에 반응하는 자연스러운 표현을 구현했습니다.',
      },
      {
        title: '모션 시스템',
        content: '모션–프레임–레이어의 3계층 구조로 애니메이션을 관리합니다. 레이어를 조작해 순간의 장면인 프레임을 구성하고, 프레임들을 시간 순서에 따라 조합해 공격·대기·이동 등 하나의 완성된 모션을 만듭니다. 프레임 간 보간 처리로 부드럽고 자연스러운 재생을 지원합니다.',
      },
      {
        title: 'stnr / anr 파일 포맷 설계',
        content: 'stnr 파일에는 모션–프레임–레이어 계층 구조의 모션 데이터를 저장합니다. anr 파일은 아틀라스(1024×1024) 기반으로 이미지 데이터를 관리하며, 용량 초과 시 아틀라스를 추가 생성하는 방식으로 확장됩니다. 두 파일 포맷을 분리해 모션 데이터와 이미지 데이터를 독립적으로 관리할 수 있도록 설계했습니다.',
      },
    ],
  },
  'booster-rooster': {
    title: '부스터 루스터',
    period: '2012.01 ~ 2012.06',
    videoId: 'LY5H2swNct8',
    engine: null,
    tags: ['JavaScript', 'HTML5', 'Canvas', 'Optimization'],
    accent: '#2a8a84',
    overview: '프로그래머·기획자·그래픽 3인 팀으로 개발한 HTML5 기반 모바일 캐주얼 게임입니다. 플랫폼에 구애받지 않는 웹 환경의 특성을 활용해 WAC 프로젝트에 참가하여 개발했으며, HTML5 Canvas API로 렌더링 루프를 구성하고 JavaScript로 게임 로직 전반을 구현했습니다.',
    sections: [
      {
        title: 'JavaScript OOP 아키텍처',
        content: 'C++ 기반의 클래스·상속 패턴을 JavaScript 환경에서 재현하기 위해 함수를 클래스 단위로 활용하고, 프로토타입 체인으로 상속을 구현했습니다. 공통 오브젝트 클래스를 기반으로 다양한 게임 오브젝트를 상속 구조로 확장해 일관된 코드 설계를 유지했습니다.',
      },
      {
        title: '모바일 환경 최적화',
        content: '웹 기반 게임을 저사양 스마트폰에서도 원활히 구동하기 위해 렌더링 최적화에 집중했습니다. 화면 영역 밖의 오브젝트는 드로우콜 대상에서 제외하는 컬링을 적용하고, 블록 단위 변수에 대한 중복 접근을 방지하기 위해 블록 진입 시 변수를 사전에 캐싱하는 방식으로 불필요한 연산을 최소화했습니다.',
      },
    ],
  },
}

const SKILLS = [
  { category: 'Languages',    items: ['C++', 'C#'] },
  { category: 'Game Engines', items: ['Unreal Engine', 'Unity'] },
  { category: 'Graphics',     items: ['DirectX', 'OpenGL'] },
  { category: 'Web',          items: ['HTML', 'Javascript'] },
  { category: 'Tools',        items: ['Visual Studio', 'Perforce', 'GitHub', 'SourceTree', 'SVN', 'TeamCity', 'Confluence', 'Jira', 'Cursor', 'Claude Code'] },
]

// 헤더 배지는 SKILLS에서 자동 파생 — SKILLS만 수정하면 헤더도 동기화됨
const TECH_BADGES = SKILLS.flatMap(s => s.items)

const AWARDS = [
  { title: '청강문화산업대학교 만화애니게임학과 졸업', year: '2017', type: 'edu' },
  { title: '대한민국 앱 창작 경진대회 금상', org: '중소기업청', year: '2012', type: 'gold' },
  { title: 'HTML 앱 공모전 은상', org: '한국무선인터넷산업연합회', year: '2012', type: 'silver' },
  { title: '전국기능경기대회 게임개발 동메달', org: '국제기능올림픽대회', year: '2010', type: 'bronze' },
  { title: '경기지방기능경기대회 게임개발 금메달', org: '국제기능올림픽대회', year: '2010', type: 'gold' },
  { title: '경기지방기능경기대회 게임개발 동메달', org: '국제기능올림픽대회', year: '2009', type: 'bronze' },
]

// ─── 유틸 ───────────────────────────────────────────────────────────────────────

const ACCENT = '#34799e'

function renderText(text, highlights, accentColor) {
  if (!highlights?.length) return text
  const pattern = new RegExp(`(${highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`)
  return text.split(pattern).map((part, i) =>
    highlights.includes(part)
      ? <span key={i} className="font-semibold" style={{ color: accentColor }}>{part}</span>
      : part
  )
}

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
    <motion.div variants={fadeUp} className="mb-6 md:mb-8">
      <h2 className="text-xl font-bold text-[#1a1a1a] tracking-tight">{children}</h2>
      <div className="mt-2 w-8 h-0.5" style={{ backgroundColor: ACCENT }} />
    </motion.div>
  )
}

// ─── YouTube 버튼 ──────────────────────────────────────────────────────────────

function YTBanner({ videoId, label }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg bg-black" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    )
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="group relative block w-full overflow-hidden rounded-lg bg-black cursor-pointer"
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
          <p className="text-white/60 text-xs mt-0.5">Play on page</p>
        </div>
      </div>
    </button>
  )
}

// ─── 이미지 갤러리 ─────────────────────────────────────────────────────────────

function ImageGallery({ images }) {
  return (
    <div className={`grid gap-2 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {images.map((src, i) => (
        <div key={i} className="relative overflow-hidden rounded-lg bg-black" style={{ aspectRatio: '16/9' }}>
          <img
            src={src}
            alt={`screenshot ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

// ─── 전체 배경 파티클 네트워크 ────────────────────────────────────────────────


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
      <div className="bg-[#1e2d3d] text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14 text-center">
          {/* 프로필 사진 */}
          <div
            className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-5 md:mb-6 overflow-hidden border-2"
            style={{ borderColor: `${ACCENT}60` }}
          >
            <img
              src="/profile.jpg"
              alt="임성택 프로필"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 이름 */}
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">임성택</h1>
          <p className="text-gray-300 text-sm md:text-base font-medium mt-1">Seong-taek Lim</p>
          <p className="text-[#34799e] text-sm md:text-base font-semibold mt-3">Game Client Developer · 10th Year</p>

          {/* 연락처 */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mt-5 md:mt-6">
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
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-8 mb-4 md:mb-6"
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
      <div className="space-y-4 max-w-2xl">
        <motion.p variants={fadeUp} className="text-gray-700 text-sm leading-8">
          {'2017년부터 '}<span className="font-semibold" style={{ color: ACCENT }}>언리얼과 유니티 엔진</span>{'을 아우르며 모바일 및 PC 플랫폼의 글로벌 서비스를 개발해 왔습니다. 닌텐도 IP '}<span className="font-semibold" style={{ color: ACCENT }}>{'\'닥터 마리오 월드\'의 초기 빌드업'}</span>{'을 통해 전 세계 59개국 동시 런칭하고, '}<span className="font-semibold" style={{ color: ACCENT }}>{'\'로스트아크\'의 5년 라이브 서비스'}</span>{'에 참여하며 160여 개국에 이르는 대규모 글로벌 서비스를 경험했습니다. 이러한 과정에서 다양한 콘텐츠 개발과 '}<span className="font-semibold" style={{ color: ACCENT }}>로우 레벨 기반의 시스템 설계·개선</span>{'을 통해 안정적인 글로벌 서비스 환경을 구축하는 데 기여했습니다.'}
        </motion.p>
        <motion.p variants={fadeUp} className="text-gray-700 text-sm leading-8">
          단순 기능 구현에 그치지 않고,{' '}
          <span className="font-semibold" style={{ color: ACCENT }}>작업 프로세스와 협업 구조를 직접 개선하며 팀 생산성을 높이는 리딩 경험</span>{'을 쌓았습니다. 로우 레벨에 대한 탄탄한 이해를 바탕으로 새로운 환경과 도구에 빠르게 적응하며, '}
          <span className="font-semibold" style={{ color: ACCENT }}>Cursor와 Claude Code</span>{' 같은 AI 도구를 워크플로우에 적극 활용해 '}
          <span className="font-semibold" style={{ color: ACCENT }}>실질적인 협업 효율</span>을 만드는 개발을 선호합니다.
        </motion.p>
      </div>
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
              <span key={i} className="font-semibold text-gray-700 font-mono">{m}</span>
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
                <p className="text-sm font-bold mb-2" style={{ color: accentColor }}>
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

// ─── Work Experience ───────────────────────────────────────────────────────────

function CompanyCard({ accent, company, totalPeriod, projects }) {
  return (
    <div className="rounded-xl overflow-hidden border-2" style={{ borderColor: accent }}>
      {/* 회사 헤더 바 */}
      <div className="flex items-center justify-between px-5 py-2.5" style={{ backgroundColor: accent }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
          <span className="text-white text-[11px] font-bold tracking-[0.15em] uppercase">{company}</span>
        </div>
        <span className="text-white text-[11px] font-semibold font-mono">{totalPeriod}</span>
      </div>

      {/* 프로젝트 목록 */}
      <div className="bg-white divide-y divide-gray-100">
        {projects.map((proj, i) => (
          <div key={i} className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-3 md:gap-5">
              {/* 연도 컬럼 */}
              <div className="shrink-0 md:w-14 md:pt-0.5 md:text-right">
                {(() => {
                  const [s, e] = proj.period.split(' – ')
                  const startYear = s.slice(0, 4)
                  const endYear = e === '현재' ? '현재' : e.slice(0, 4)
                  return endYear === startYear ? (
                    <span className="text-xl md:text-2xl font-black leading-none" style={{ color: accent }}>{startYear}</span>
                  ) : (
                    <div className="flex md:flex-col items-baseline md:items-end gap-1 md:gap-0 leading-tight">
                      <span className="text-xl md:text-2xl font-black" style={{ color: accent }}>{startYear}</span>
                      <span className="text-[11px] font-semibold" style={{ color: `${accent}99` }}>– {endYear}</span>
                    </div>
                  )
                })()}
              </div>

              {/* 구분선 */}
              <div className="hidden md:block shrink-0 w-px self-stretch" style={{ backgroundColor: `${accent}40` }} />

              {/* 내용 */}
              <div className="flex-1">
                <div className="mb-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-[#1a1a1a] font-bold text-lg tracking-tight">{proj.title}</h3>
                    {proj.badge && (
                      <span className={`text-xs font-medium ${proj.badgeGreen ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {proj.badgeGreen ? '● ' : ''}{proj.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-500">
                    {proj.studio && <span className="font-medium text-gray-600">{proj.studio}</span>}
                    <span className="font-semibold text-gray-700 font-mono">{proj.period}</span>
                    {proj.engine && <EngineIcon engine={proj.engine} />}
                  </div>
                </div>

                {proj.summary && (
                  <p className="text-gray-600 text-sm mb-4 pb-4 border-b border-gray-100">{proj.summary}</p>
                )}

                {proj.videoId && (
                  <div className="mb-4">
                    <YTBanner videoId={proj.videoId} label={`${proj.title} — YouTube`} />
                  </div>
                )}
                {!proj.videoId && proj.images && (
                  <div className="mb-4">
                    <ImageGallery images={proj.images} />
                  </div>
                )}

                <div className="space-y-4">
                  {proj.contributions.map((c, j) => (
                    <div key={j} className="flex gap-4">
                      <div
                        className="shrink-0 w-0.5 rounded-full mt-1 self-stretch min-h-[1rem]"
                        style={{ backgroundColor: accent }}
                      />
                      <div>
                        <p className="text-sm font-bold mb-2" style={{ color: accent }}>{c.label}</p>
                        <p className="text-gray-700 text-sm leading-7">{renderText(c.text, c.highlights, '#c07a30')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const SMILEGATE_PROJECTS = [
  {
    title: 'Lost Ark',
    studio: 'Tripod Studio',
    period: '2021.07 – 현재',
    badge: '라이브 서비스 중',
    badgeGreen: true,
    engine: 'unreal',
    videoId: 'jBspl-Am1eY',
    contributions: LOST_ARK_CONTRIBUTIONS,
  },
]

const NHN_PROJECTS = NHN_ITEMS.map(item => ({
  title: item.project,
  studio: item.studio,
  period: item.period,
  badge: item.released || item.status,
  badgeGreen: !!item.released,
  engine: item.engine,
  videoId: item.videoId,
  contributions: item.contributions,
}))

function WorkExperience() {
  return (
    <Section id="work">
      <SectionHeading>Work Experience</SectionHeading>
      <div className="space-y-6">
        <motion.div variants={fadeUp}>
          <CompanyCard
            accent="#34799e"
            company="Smilegate RPG"
            totalPeriod="2021.07 – 현재"
            projects={SMILEGATE_PROJECTS}
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <CompanyCard
            accent="#5a7a5a"
            company="NHN Group"
            totalPeriod="2017.09 – 2021.07"
            projects={NHN_PROJECTS}
          />
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

function PersonalWork({ onSelect }) {
  const headerColor = '#1e293b'
  return (
    <Section id="personal">
      <SectionHeading>Personal Work</SectionHeading>
      <motion.p variants={fadeUp} className="text-gray-500 text-sm mb-8 -mt-4 leading-relaxed">
        상용 엔진이 내부적으로 어떻게 돌아가는지 직접 확인해보고 싶어 시작한 프로젝트들입니다. DirectX와 OpenGL 기반 렌더러부터 GJK/EPA 물리 시뮬레이션, IOCP 서버, NDK 크로스 플랫폼 환경까지 직접 구축하며 기반 기술 스택을 경험해 왔습니다. 나아가 언리얼·유니티의 아키텍처를 탐구하거나 절차적 메시 생성 같은 흥미로운 기술 과제들을 스스로 파고들며 진행한 개인 프로젝트들입니다.
      </motion.p>
      <motion.div variants={fadeUp}>
        <div className="rounded-xl overflow-hidden border-2" style={{ borderColor: headerColor }}>
          {/* 헤더 바 */}
          <div className="flex items-center gap-2 px-5 py-2.5" style={{ backgroundColor: headerColor }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
            <span className="text-white text-[11px] font-bold tracking-[0.15em] uppercase">Personal Project</span>
          </div>
          {/* 연도별 그룹 */}
          <div className="bg-white divide-y divide-gray-100">
            {PERSONAL_WORK.map((group) => (
              <div key={group.year} className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-3 md:gap-5">
                  {/* 연도 컬럼 */}
                  <div className="shrink-0 md:w-14 md:pt-0.5 md:text-right">
                    <span className="text-xl md:text-2xl font-black leading-none" style={{ color: group.accent }}>{group.year}</span>
                  </div>
                  {/* 구분선 */}
                  <div className="hidden md:block shrink-0 w-px self-stretch" style={{ backgroundColor: `${group.accent}40` }} />
                  {/* 프로젝트 목록 */}
                  <div className="flex-1 space-y-8">
                    {group.projects.map((proj, i) => (
                      <div key={i}>
                        <div className="mb-4">
                          <h3 className="text-[#1a1a1a] font-bold text-lg tracking-tight">{proj.title}</h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-1.5 text-xs text-gray-500">
                            <span className="font-mono">{proj.period}</span>
                            {proj.engine && <EngineIcon engine={proj.engine} />}
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            {sortTags(proj.tags).map((tag) => (
                              <span key={tag} className={`px-2 py-0.5 text-[11px] font-semibold rounded border ${TAG_COLOR_MAP[tag] ?? TAG_COLOR_DEFAULT}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        {proj.videoId && (
                          <div className="mb-4">
                            <YTBanner videoId={proj.videoId} label={`${proj.title} — YouTube`} />
                          </div>
                        )}
                        {!proj.videoId && proj.images && (
                          <div className="mb-4">
                            <ImageGallery images={proj.images} />
                          </div>
                        )}
                        <div className="flex gap-4">
                          <div className="shrink-0 w-0.5 rounded-full mt-1 self-stretch min-h-[1rem]" style={{ backgroundColor: group.accent }} />
                          <p className="text-gray-700 text-sm leading-7">{proj.desc}</p>
                        </div>
                        <button
                          onClick={() => onSelect(proj.id)}
                          className="mt-4 flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-70"
                          style={{ color: group.accent }}
                        >
                          자세히 보기 <ChevronRight size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  )
}

function ProjectDetailPage({ projectId, onBack }) {
  const detail = PERSONAL_WORK_DETAILS[projectId]
  if (!detail) return null
  const accent = detail.accent

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="max-w-4xl mx-auto px-3 md:px-6 py-4 md:py-8"
    >
      {/* 뒤로 가기 */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6 group"
      >
        <ChevronRight size={14} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
        Personal Work
      </button>

      {/* 프로젝트 헤더 카드 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-8 mb-4 md:mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: accent }}>Personal Project</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#1a1a1a] mt-2">{detail.title}</h1>
        {detail.engine && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 text-xs text-gray-500">
            <EngineIcon engine={detail.engine} />
          </div>
        )}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {sortTags(detail.tags).map(tag => (
            <span key={tag} className={`px-2 py-0.5 text-[11px] font-semibold rounded border ${TAG_COLOR_MAP[tag] ?? TAG_COLOR_DEFAULT}`}>
              {tag}
            </span>
          ))}
        </div>

        {detail.videoId && (
          <div className="mt-5">
            <YTBanner videoId={detail.videoId} label={`${detail.title} — YouTube`} />
          </div>
        )}
        {!detail.videoId && detail.images && (
          <div className="mt-5">
            <ImageGallery images={detail.images} />
          </div>
        )}

        {/* 개요 */}
        <div className="flex gap-4 mt-6">
          <div className="shrink-0 w-0.5 rounded-full self-stretch min-h-[1rem]" style={{ backgroundColor: accent }} />
          <p className="text-gray-700 text-sm leading-7">{detail.overview}</p>
        </div>
      </div>

      {/* 섹션들 */}
      <div className="space-y-4 md:space-y-6">
        {detail.sections.map((section, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-8">
            <h2 className="text-base font-bold text-[#1a1a1a] tracking-tight mb-4"
              style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '0.75rem' }}
            >
              {section.title}
            </h2>
            <p className="text-gray-700 text-sm leading-7">{section.content}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function Skills() {
  return (
    <Section id="skills">
      <SectionHeading>Technical Skills</SectionHeading>
      <div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-6 md:gap-y-7">
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

// ─── Activities & Mentoring ────────────────────────────────────────────────────

const ACTIVITIES = [
  {
    year: '2025',
    items: [
      {
        title: '글로벌 게임 서비스를 위한 기술적 고려사항',
        org: '대구게임아카데미',
        desc: '글로벌 서비스의 지역별 요구사항에 유연하게 대응하기 위한 데이터 중심 아키텍처 설계와 기술적 확장성 확보 방안을 다뤘습니다.',
      },
      {
        title: '게임 개발 파이프라인',
        org: '도봉 캠퍼스',
        desc: '실제 프로젝트 파이프라인을 분석하여 타 직군과의 마찰을 줄이고 효율적으로 소통하는 협업 방식을 다뤘습니다.',
      },
    ],
  },
  {
    year: '2024',
    items: [
      {
        title: '게임 개발자 로드맵',
        org: '강동 캠퍼스',
        desc: '현업에서 요구하는 핵심 기술 스택을 정의하고, 서류 전형부터 기술 면접에 이르는 채용 단계별 과정을 공유했습니다.',
      },
    ],
  },
  {
    year: '2023',
    items: [
      {
        title: '클라이언트 개발 아키텍처',
        org: '호서대학교 아산캠퍼스',
        desc: '기획 요구사항에 대한 기술적 검증부터 알고리즘 설계, 실제 시스템 구현까지 이어지는 클라이언트 개발의 전체 프로세스를 공유했습니다.',
      },
      {
        title: '예비 개발자를 위한 논리적 사고력 멘토링',
        org: '그루터기 비전센터',
        desc: '초중고 학생을 대상으로 프로그래밍 언어의 본질적인 역할과 논리적 문제 해결의 중요성을 실제 게임 개발 사례를 공유했습니다.',
      },
    ],
  },
]

function Activities() {
  const accent = '#8a5a7a'
  return (
    <Section id="activities">
      <SectionHeading>Activities & Mentoring</SectionHeading>
      <motion.p variants={fadeUp} className="text-gray-500 text-sm mb-8 -mt-4 leading-relaxed">
        실무에서의 기술적 고민과 해결 과정에서 얻은 경험을 세미나와 멘토링을 통해 나누고 있습니다.
      </motion.p>
      <motion.div variants={fadeUp}>
        <div className="rounded-xl overflow-hidden border-2" style={{ borderColor: accent }}>
          {/* 헤더 바 */}
          <div className="flex items-center gap-2 px-5 py-2.5" style={{ backgroundColor: accent }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
            <span className="text-white text-[11px] font-bold tracking-[0.15em] uppercase">Activities & Mentoring</span>
          </div>
          {/* 연도별 그룹 */}
          <div className="bg-white divide-y divide-gray-100">
            {ACTIVITIES.map((group) => (
              <div key={group.year} className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-3 md:gap-5">
                  {/* 연도 컬럼 */}
                  <div className="shrink-0 md:w-14 md:pt-0.5 md:text-right">
                    <span className="text-xl md:text-2xl font-black leading-none" style={{ color: accent }}>{group.year}</span>
                  </div>
                  {/* 구분선 */}
                  <div className="hidden md:block shrink-0 w-px self-stretch" style={{ backgroundColor: `${accent}40` }} />
                  {/* 항목 목록 */}
                  <div className="flex-1 space-y-5">
                    {group.items.map((item, i) => (
                      <div key={i}>
                        <div className="flex flex-wrap items-baseline gap-x-2 mb-1">
                          <h3 className="text-[#1a1a1a] font-bold text-base tracking-tight">{item.title}</h3>
                          {item.org && <span className="text-xs text-gray-400 font-medium">{item.org}</span>}
                        </div>
                        <p className="text-gray-600 text-sm leading-7">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
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

// ─── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <Section id="contact">
      <SectionHeading>Contact</SectionHeading>
      <motion.div variants={fadeUp} className="rounded-xl overflow-hidden border border-gray-200 bg-white">
        <div className="px-6 py-8 md:py-10 flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-0 md:divide-x divide-gray-100">
          {/* 이메일 */}
          <div className="flex-1 flex flex-col items-center gap-3 md:px-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ACCENT}18` }}>
              <Mail size={18} style={{ color: ACCENT }} />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Email</p>
              <a
                href="mailto:ljslove119@naver.com"
                className="text-sm font-semibold text-gray-800 hover:underline transition-colors"
                style={{ color: ACCENT }}
              >
                ljslove119@naver.com
              </a>
            </div>
          </div>
          {/* 전화 */}
          <div className="flex-1 flex flex-col items-center gap-3 md:px-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ACCENT}18` }}>
              <Phone size={18} style={{ color: ACCENT }} />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Phone</p>
              <a
                href="tel:01052235291"
                className="text-sm font-semibold"
                style={{ color: ACCENT }}
              >
                010-5223-5291
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────────

function getProjectFromURL() {
  return new URLSearchParams(window.location.search).get('project')
}

export default function App() {
  const [activeSection, setActiveSection]   = useState('about')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(getProjectFromURL)
  const savedScrollY = useRef(0)

  // URL → state 동기화 (브라우저 뒤로/앞으로 가기)
  useEffect(() => {
    const onPopState = (e) => {
      const project = getProjectFromURL()
      if (!project && e.state?.scrollY != null) {
        savedScrollY.current = e.state.scrollY
      }
      setSelectedProject(project)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const selectProject = (id) => {
    // 현재 메인 페이지 entry에 스크롤 위치 저장
    window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '')
    // 상세 페이지로 push (fromApp 플래그로 앱 내 이동 여부 표시)
    window.history.pushState({ project: id, fromApp: true }, '', `?project=${id}`)
    setSelectedProject(id)
  }

  const goBack = () => {
    if (window.history.state?.fromApp) {
      // 앱 내에서 pushState로 이동했던 경우 → 안전하게 back()
      window.history.back()
    } else {
      // 직접 URL 접근 등 히스토리가 없는 경우 → 수동으로 메인 복귀
      window.history.replaceState(null, '', '/')
      setSelectedProject(null)
    }
  }

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

      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetailPage
            key="detail"
            projectId={selectedProject}
            onBack={goBack}
          />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onAnimationComplete={() => {
              if (savedScrollY.current > 0) {
                window.scrollTo({ top: savedScrollY.current, behavior: 'smooth' })
                savedScrollY.current = 0
              }
            }}
            className="max-w-4xl mx-auto px-3 md:px-6 py-4 md:py-8"
          >
            <About />
            <WorkExperience />
            <Activities />
            <Skills />
            <PersonalWork onSelect={selectProject} />
            <Awards />
            <Contact />
            <footer className="text-center py-6">
              <p className="text-gray-400 text-xs">© 2026 Seong-taek Lim · Game Client Developer</p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
