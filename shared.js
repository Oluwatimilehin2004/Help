// ===== shared.js: settings, details and essays for the Dean's List page =====

const CONFIG = {
  // Dean's List Google Form
  deansFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSceH_SEI4HLP_g3n-gmYNl29mjpC9BsT-lb0v7ZDl2UUuuXvw/viewform",
  // Photo shown in the circle. Must sit next to index.html with this exact name.
  photo: "PapaImage.jpeg",
  // Free counter service (no backend). Keep the namespace unique to you.
  counterBase: "https://abacus.jasoncameron.dev",
  counterNamespace: "papa-reconciliation-2026-aojudun"
};

const NAME = {
  first: "Ayomide",
  last: "Ojudun",
  full: "Ayomide Oluwatimilehin Ojudun",
  email: "a.ojudun@alustudent.com",
  year: "Year 2, Trimester 2",
  programme: "BSc. in Software Engineering",
  intake: "May 2025",        // must match the form's option exactly
  evidence: "https://drive.google.com/drive/folders/1Xn_WsPUYiwuH79-1ESYE8oVq1t8z5WGr?usp=sharing"
};

const GROUPS = [
  {
    "id": "alive",
    "label": "ALU Alive events",
    "sub": "Scavenger Hunt, watch parties, Love Week",
    "color": "--note-y",
    "dl": "I would like to nominate Ayomide Ojudun for his outstanding contribution as Head of ALU Alive under the Student Representative Council. Throughout his tenure, he has demonstrated a strong commitment to student engagement, community building, and creating memorable experiences for the ALU community.\n\nThrough initiatives such as the Scavenger Hunt, football watch parties, Love Week activities, and other student engagement events, Ayomide has consistently created opportunities for students to connect, participate, and build friendships beyond their academic responsibilities. His leadership has helped bring together students from different cohorts, backgrounds, and interests, strengthening the sense of community on campus.\n\nWhat particularly stands out about Ayomide is his willingness to take initiative, collaborate with different student organisations, and create experiences that make campus life more engaging and inclusive. He approaches student leadership as an opportunity to serve others and contribute meaningfully to the university community.\n\nHis dedication, creativity, and commitment to student engagement make him a deserving candidate for recognition."
  },
  {
    "id": "kmc",
    "label": "KMC outings",
    "sub": "Kewtu Sunday, the mountain hike, Fazenda Shenga",
    "color": "--note-m",
    "dl": "I would like to nominate Ayomide Ojudun for his valuable contributions as a member of the KMC organising team. Through his involvement, he has played an active role in creating engaging experiences that bring students together beyond the classroom.\n\nAyomide contributes to event planning and coordination, student communication, transportation arrangements, participant coordination, and media coverage. His involvement in activities such as Kewtu Sunday, the Kigali Mountain Hike, and Fazenda Shenga demonstrates his commitment to ensuring students have opportunities to participate, connect, and enjoy meaningful experiences together.\n\nDuring the Kigali Mountain Hike, which brought together approximately 60 students, he contributed to coordinating transportation, communication, logistics, and media coverage. His involvement extends beyond planning, as he also helps document these experiences through photographs, videos, and other content that captures the spirit of student engagement.\n\nAyomide’s commitment to teamwork, organisation, and creating opportunities for students to connect makes him a deserving candidate for recognition."
  },
  {
    "id": "python",
    "label": "Python sessions",
    "sub": "Student Success support",
    "color": "--note-b",
    "dl": "I would like to nominate Ayomide Ojudun for his contribution to ALU’s Student Success activities, particularly his role in supporting students struggling with Python.\n\nAs a student who understands the challenges of learning difficult technical concepts, Ayomide took the initiative to support fellow students by facilitating additional Python learning sessions. Through these sessions, he helped students revisit challenging concepts, strengthen their understanding, and improve their confidence in the course.\n\nHis contribution reflects a genuine commitment to helping others succeed academically rather than focusing solely on his own performance. By sharing his knowledge and dedicating time to supporting students who needed additional assistance, Ayomide demonstrated patience, collaboration, and a strong sense of responsibility toward his peers.\n\nHis willingness to contribute to the academic growth of others makes him a deserving candidate for recognition."
  },
  {
    "id": "class",
    "label": "Our class",
    "sub": "Peer learning and study groups",
    "color": "--note-y",
    "dl": "I would like to nominate Ayomide Ojudun for his commitment to peer learning and academic collaboration within our class.\n\nAyomide has consistently taken the initiative to bring classmates together to support one another academically, particularly in Python and other challenging coursework. Rather than allowing students to struggle individually, he encouraged collaborative learning by connecting classmates who understood certain concepts better with those who needed additional support.\n\nThrough these learning sessions, students had opportunities to revisit difficult topics, discuss assignments, prepare for quizzes, and strengthen their understanding of course materials. His efforts contributed to creating a more collaborative learning environment where students could learn from one another and improve together.\n\nWhat makes Ayomide’s contribution particularly meaningful is that it comes from his willingness to help others succeed. He demonstrates that academic excellence is not only about individual achievement but also about contributing to the growth and success of those around you."
  },
  {
    "id": "friends",
    "label": "We’re friends",
    "sub": "You just know me",
    "color": "--note-p",
    "dl": "I would like to nominate Ayomide Oluwatimilehin Ojudun because he embodies inclusive leadership, cultural openness, and a genuine commitment to bringing people together.\n\nAs a Nigerian student studying in Rwanda, Ayomide has demonstrated an appreciation for cultural diversity and the importance of building meaningful relationships across different backgrounds. He speaks English, Yoruba, Spanish and French, and consistently demonstrates openness toward people with different cultural perspectives and experiences. Rather than allowing cultural differences to create division, he makes an effort to understand people within their cultural contexts.\n\nThrough his role as Head of SRC ALU Alive and his work with KMC, Ayomide has actively created opportunities for students to connect and build a stronger sense of community. As part of the KMC organising team, he coordinates activities, manages transportation and logistics, communicates with participants, and documents experiences through media and content creation. Activities such as Kewtu Sunday, the Kigali Mountain Hike (around 60 students), and Fazenda Shenga give students the chance to build relationships beyond their usual academic and social circles.\n\nHis commitment to community also extends into academics, where he has supported classmates struggling with Python through Student Success activities and peer learning initiatives.\n\nWhat distinguishes Ayomide is his willingness to understand cultural differences, collaborate with diverse individuals, and consistently contribute toward a more connected and inclusive community. His leadership and commitment to others make him a deserving candidate for recognition."
  }
];

// ===== Helpers =====
const $ = id => document.getElementById(id);
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

function toast(msg){
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2200);
}

async function copyText(text){
  try { await navigator.clipboard.writeText(text); return true; }
  catch(e){
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly',''); ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch(_){}
    ta.remove(); return ok;
  }
}

function wordCount(s){ const m = s.trim().match(/\S+/g); return m ? m.length : 0; }

function unlock(id){ const s = $(id); s.classList.remove('locked'); s.removeAttribute('aria-disabled'); }

// Counts each device once per flag; never stores who it was
function countOnce(flag, keys){
  let first = true;
  try { if (localStorage.getItem(flag)) first = false; else localStorage.setItem(flag, '1'); } catch(e){}
  if (!first) return;
  keys.forEach(k => fetch(CONFIG.counterBase + '/hit/' + CONFIG.counterNamespace + '/' + k).catch(() => null));
}

function loadPhoto(){
  if (!CONFIG.photo) return;
  const img = new Image(); img.alt = 'Papa';
   img.onload = () => {
    const f = $('face'); if (!f) return;
    f.textContent = ''; f.appendChild(img);
    const me = document.createElement('span');
    me.className = 'me'; me.textContent = 'that’s me';
    f.appendChild(me);
  };
  img.src = CONFIG.photo;
}

function renderGroups(container, onPick){
  GROUPS.forEach(g => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'group'; b.dataset.id = g.id; b.setAttribute('aria-pressed','false');
    b.style.setProperty('--c', 'var(' + g.color + ')');
    b.innerHTML = '<strong></strong><span></span>';
    b.querySelector('strong').textContent = g.label;
    b.querySelector('span').textContent = g.sub;
    b.addEventListener('click', () => {
      container.querySelectorAll('.group').forEach(x => x.setAttribute('aria-pressed','false'));
      b.setAttribute('aria-pressed','true');
      onPick(g, true);
    });
    container.appendChild(b);
  });
}

function renderFields(container, rows){
  rows.forEach(([label, val]) => {
    const row = document.createElement('div'); row.className = 'field';
    row.innerHTML = '<div><em></em><b></b></div>';
    row.querySelector('em').textContent = label;
    row.querySelector('b').textContent = val || 'Papa is adding this soon';
    if (val) {
      const btn = document.createElement('button');
      btn.className = 'chip'; btn.type = 'button'; btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy ' + label.toLowerCase());
      btn.addEventListener('click', async () => {
        const ok = await copyText(val);
        if(ok){ btn.textContent = 'Copied'; btn.classList.add('ok'); setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('ok'); }, 1500); }
        else toast('Copy didn’t work. Press and hold the text to copy it.');
      });
      row.appendChild(btn);
    }
    container.appendChild(row);
  });
}

function confetti(){
  if (REDUCE) return;
  const colors = ['--note-y','--note-p','--note-m','--note-b'];
  for (let i = 0; i < 70; i++){
    const c = document.createElement('div'); c.className = 'confetti';
    c.style.left = Math.random()*100 + 'vw';
    c.style.background = 'var(' + colors[i % 4] + ')';
    c.style.setProperty('--dx', (Math.random()*160 - 80) + 'px');
    c.style.setProperty('--rot', (Math.random()*900 - 450) + 'deg');
    c.style.animationDuration = (1.8 + Math.random()*1.6) + 's';
    c.style.animationDelay = (Math.random()*0.4) + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4200);
  }
}
