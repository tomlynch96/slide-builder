export interface SpecPoint {
  ref: string
  title: string
}

export interface SpecTopic {
  ref: string
  title: string
  points: SpecPoint[]
}

export interface Qualification {
  id: string
  label: string
  shortLabel: string
  topics: SpecTopic[]
}

// ── Edexcel GCSE Physics (9-1) — 1PH0 ────────────────────────────────────────

const gcsePhysicsTopics: SpecTopic[] = [
  {
    ref: 'T1', title: 'Key concepts of physics',
    points: [
      { ref: '1.1', title: 'SI units and standard form' },
      { ref: '1.2', title: 'Scalars and vectors' },
      { ref: '1.3', title: 'Significant figures and uncertainties' },
      { ref: '1.4', title: 'Equations, graphs and data analysis' },
    ],
  },
  {
    ref: 'T2', title: 'Motion and forces',
    points: [
      { ref: '2.1', title: 'Describing motion — distance, speed and velocity' },
      { ref: '2.2', title: 'Distance–time graphs' },
      { ref: '2.3', title: 'Velocity–time graphs and acceleration' },
      { ref: '2.4', title: 'Equations of motion (v = u + at, etc.)' },
      { ref: '2.5', title: 'Newton\'s First Law — balanced forces and inertia' },
      { ref: '2.6', title: 'Newton\'s Second Law — F = ma' },
      { ref: '2.7', title: 'Newton\'s Third Law — action and reaction pairs' },
      { ref: '2.8', title: 'Weight, mass and gravitational field strength' },
      { ref: '2.9', title: 'Stopping distances — thinking and braking distance' },
      { ref: '2.10', title: 'Momentum — p = mv' },
      { ref: '2.11', title: 'Conservation of momentum' },
      { ref: '2.12', title: 'Forces and elasticity — Hooke\'s Law' },
    ],
  },
  {
    ref: 'T3', title: 'Conservation of energy',
    points: [
      { ref: '3.1', title: 'Energy stores and transfers' },
      { ref: '3.2', title: 'Conservation of energy' },
      { ref: '3.3', title: 'Efficiency of energy transfers' },
      { ref: '3.4', title: 'Power — P = E/t and P = W/t' },
      { ref: '3.5', title: 'Reducing energy losses — insulation and lubrication' },
    ],
  },
  {
    ref: 'T4', title: 'Waves',
    points: [
      { ref: '4.1', title: 'Properties of waves — amplitude, wavelength, frequency, period' },
      { ref: '4.2', title: 'Wave equation — v = fλ' },
      { ref: '4.3', title: 'Transverse and longitudinal waves' },
      { ref: '4.4', title: 'Reflection of waves' },
      { ref: '4.5', title: 'Refraction of waves' },
      { ref: '4.6', title: 'Sound waves and hearing' },
      { ref: '4.7', title: 'Ultrasound and its uses' },
      { ref: '4.8', title: 'Seismic waves — P-waves and S-waves' },
    ],
  },
  {
    ref: 'T5', title: 'Light and the electromagnetic spectrum',
    points: [
      { ref: '5.1', title: 'The electromagnetic spectrum — properties and order' },
      { ref: '5.2', title: 'Speed, frequency and wavelength of EM waves' },
      { ref: '5.3', title: 'Uses of EM waves (radio, microwave, IR, visible, UV, X-ray, gamma)' },
      { ref: '5.4', title: 'Dangers of EM radiation' },
      { ref: '5.5', title: 'Refraction at boundaries and refractive index' },
      { ref: '5.6', title: 'Total internal reflection and critical angle' },
      { ref: '5.7', title: 'Lenses — converging and diverging, real and virtual images' },
      { ref: '5.8', title: 'Colour — absorption, transmission and reflection' },
    ],
  },
  {
    ref: 'T6', title: 'Radioactivity',
    points: [
      { ref: '6.1', title: 'Atomic structure — protons, neutrons, electrons' },
      { ref: '6.2', title: 'Isotopes and relative atomic mass' },
      { ref: '6.3', title: 'Alpha, beta and gamma radiation — nature and properties' },
      { ref: '6.4', title: 'Nuclear equations for decay' },
      { ref: '6.5', title: 'Half-life and radioactive decay graphs' },
      { ref: '6.6', title: 'Uses of radioactivity — medical and industrial' },
      { ref: '6.7', title: 'Dangers of ionising radiation and safety precautions' },
      { ref: '6.8', title: 'Background radiation and its sources' },
      { ref: '6.9', title: 'Nuclear fission and chain reactions' },
      { ref: '6.10', title: 'Nuclear fusion and stars' },
    ],
  },
  {
    ref: 'T7', title: 'Astronomy (separate Physics only)',
    points: [
      { ref: '7.1', title: 'The solar system — planets, moons, asteroids, comets' },
      { ref: '7.2', title: 'Orbital speed and gravitational force' },
      { ref: '7.3', title: 'Life cycle of stars' },
      { ref: '7.4', title: 'The expanding universe and red-shift' },
      { ref: '7.5', title: 'The Big Bang theory' },
      { ref: '7.6', title: 'Dark matter and dark energy' },
    ],
  },
  {
    ref: 'T8', title: 'Energy — forces doing work',
    points: [
      { ref: '8.1', title: 'Work done — W = Fs (work = force × distance)' },
      { ref: '8.2', title: 'Gravitational potential energy — GPE = mgh' },
      { ref: '8.3', title: 'Kinetic energy — KE = ½mv²' },
      { ref: '8.4', title: 'Energy conservation in mechanical systems' },
      { ref: '8.5', title: 'Power in mechanical systems' },
    ],
  },
  {
    ref: 'T9', title: 'Forces and their effects',
    points: [
      { ref: '9.1', title: 'Adding forces — resultant force' },
      { ref: '9.2', title: 'Centre of gravity' },
      { ref: '9.3', title: 'Moments, levers and torques — moment = Fd' },
      { ref: '9.4', title: 'Conditions for equilibrium' },
      { ref: '9.5', title: 'Pressure — P = F/A' },
      { ref: '9.6', title: 'Pressure in fluids — depth and atmospheric pressure' },
      { ref: '9.7', title: 'Upthrust and Archimedes\' principle' },
    ],
  },
  {
    ref: 'T10', title: 'Electricity and circuits',
    points: [
      { ref: '10.1', title: 'Electric charge and current — I = Q/t' },
      { ref: '10.2', title: 'Potential difference, resistance — V = IR' },
      { ref: '10.3', title: 'Series circuits — current, voltage and resistance rules' },
      { ref: '10.4', title: 'Parallel circuits — current, voltage and resistance rules' },
      { ref: '10.5', title: 'I–V characteristics — ohmic, filament lamp, diode' },
      { ref: '10.6', title: 'Electrical power — P = VI = I²R' },
      { ref: '10.7', title: 'Energy transfer — E = VIt' },
      { ref: '10.8', title: 'The National Grid and electricity transmission' },
    ],
  },
  {
    ref: 'T11', title: 'Static electricity',
    points: [
      { ref: '11.1', title: 'Charging by friction — electron transfer' },
      { ref: '11.2', title: 'Attraction and repulsion between charges' },
      { ref: '11.3', title: 'Electric fields — field lines and strength' },
      { ref: '11.4', title: 'Dangers and uses of static electricity' },
    ],
  },
  {
    ref: 'T12', title: 'Magnetism and the motor effect',
    points: [
      { ref: '12.1', title: 'Permanent magnets and magnetic fields' },
      { ref: '12.2', title: 'Electromagnets and solenoids' },
      { ref: '12.3', title: 'The motor effect — F = BIL' },
      { ref: '12.4', title: 'Fleming\'s Left-Hand Rule' },
      { ref: '12.5', title: 'DC electric motors' },
      { ref: '12.6', title: 'Loudspeakers and the motor effect' },
    ],
  },
  {
    ref: 'T13', title: 'Electromagnetic induction',
    points: [
      { ref: '13.1', title: 'Inducing a potential difference — Faraday\'s Law' },
      { ref: '13.2', title: 'Lenz\'s Law and direction of induced current' },
      { ref: '13.3', title: 'AC generators — structure and output' },
      { ref: '13.4', title: 'Transformers — step-up and step-down, Vs/Vp = Ns/Np' },
      { ref: '13.5', title: 'Microphones and electromagnetic induction' },
    ],
  },
  {
    ref: 'T14', title: 'Particle model',
    points: [
      { ref: '14.1', title: 'States of matter — particle model descriptions' },
      { ref: '14.2', title: 'Changes of state and latent heat' },
      { ref: '14.3', title: 'Specific heat capacity — Q = mcΔT' },
      { ref: '14.4', title: 'Specific latent heat — Q = mL' },
      { ref: '14.5', title: 'Gas pressure and temperature — particle explanation' },
      { ref: '14.6', title: 'Boyle\'s Law — pressure–volume relationship' },
    ],
  },
  {
    ref: 'T15', title: 'Forces and matter',
    points: [
      { ref: '15.1', title: 'Density — ρ = m/V' },
      { ref: '15.2', title: 'Measuring density of regular and irregular objects' },
      { ref: '15.3', title: 'Hooke\'s Law and the spring constant — F = ke' },
      { ref: '15.4', title: 'Elastic and plastic deformation, elastic limit' },
      { ref: '15.5', title: 'Pressure in fluids and at depth — P = hρg' },
    ],
  },
]

// ── Edexcel A Level Physics (9PH0) ───────────────────────────────────────────

const aLevelPhysicsTopics: SpecTopic[] = [
  {
    ref: 'T1', title: 'Working as a physicist',
    points: [
      { ref: '1.1', title: 'SI units, base and derived units' },
      { ref: '1.2', title: 'Significant figures, precision and accuracy' },
      { ref: '1.3', title: 'Uncertainties — absolute, fractional and percentage' },
      { ref: '1.4', title: 'Graphical analysis — gradients, intercepts, best-fit lines' },
      { ref: '1.5', title: 'Planning and evaluating experiments' },
    ],
  },
  {
    ref: 'T2', title: 'Mechanics',
    points: [
      { ref: '2.1', title: 'Scalars and vectors — addition, resolution into components' },
      { ref: '2.2', title: 'Kinematics — equations of motion (suvat)' },
      { ref: '2.3', title: 'Projectile motion' },
      { ref: '2.4', title: 'Newton\'s laws of motion' },
      { ref: '2.5', title: 'Momentum — p = mv, impulse = FΔt' },
      { ref: '2.6', title: 'Conservation of momentum in collisions' },
      { ref: '2.7', title: 'Work, energy and power — W = Fs, P = W/t' },
      { ref: '2.8', title: 'Conservation of energy, efficiency' },
      { ref: '2.9', title: 'Density and pressure' },
      { ref: '2.10', title: 'Upthrust and flotation' },
      { ref: '2.11', title: 'Viscosity and Stokes\' Law' },
    ],
  },
  {
    ref: 'T3', title: 'Electric circuits',
    points: [
      { ref: '3.1', title: 'Charge, current and Kirchhoff\'s First Law' },
      { ref: '3.2', title: 'Potential difference, EMF and energy — E = QV' },
      { ref: '3.3', title: 'Resistance, Ohm\'s Law — R = V/I' },
      { ref: '3.4', title: 'Resistivity — R = ρL/A' },
      { ref: '3.5', title: 'I–V characteristics — ohmic, filament, diode, NTC thermistor, LDR' },
      { ref: '3.6', title: 'Series and parallel circuits — Kirchhoff\'s Second Law' },
      { ref: '3.7', title: 'Electrical power — P = IV = I²R = V²/R' },
      { ref: '3.8', title: 'Potential dividers' },
      { ref: '3.9', title: 'EMF and internal resistance — ε = I(R + r)' },
    ],
  },
  {
    ref: 'T4', title: 'Materials',
    points: [
      { ref: '4.1', title: 'Hooke\'s Law and the spring constant' },
      { ref: '4.2', title: 'Stress and strain' },
      { ref: '4.3', title: 'Young modulus — E = stress/strain' },
      { ref: '4.4', title: 'Elastic strain energy — area under F–x graph' },
      { ref: '4.5', title: 'Elastic and plastic deformation, fracture and yield' },
      { ref: '4.6', title: 'Stress–strain curves for metals, polymers and ceramics' },
    ],
  },
  {
    ref: 'T5', title: 'Waves and the particle nature of light',
    points: [
      { ref: '5.1', title: 'Progressive waves — amplitude, wavelength, frequency, phase' },
      { ref: '5.2', title: 'Wave speed — v = fλ' },
      { ref: '5.3', title: 'Transverse and longitudinal waves' },
      { ref: '5.4', title: 'Polarisation of transverse waves' },
      { ref: '5.5', title: 'Superposition, interference and path difference' },
      { ref: '5.6', title: 'Stationary waves — nodes, antinodes, harmonics' },
      { ref: '5.7', title: 'Diffraction — single slit and diffraction gratings (nλ = d sinθ)' },
      { ref: '5.8', title: 'Refraction — Snell\'s Law and refractive index' },
      { ref: '5.9', title: 'Total internal reflection and critical angle' },
      { ref: '5.10', title: 'Photoelectric effect — threshold frequency, work function' },
      { ref: '5.11', title: 'Photon energy — E = hf' },
      { ref: '5.12', title: 'Wave–particle duality, de Broglie wavelength — λ = h/mv' },
      { ref: '5.13', title: 'Electron diffraction and evidence for wave–particle duality' },
    ],
  },
  {
    ref: 'T6', title: 'Further mechanics',
    points: [
      { ref: '6.1', title: 'Circular motion — angular velocity, centripetal acceleration' },
      { ref: '6.2', title: 'Centripetal force — F = mv²/r' },
      { ref: '6.3', title: 'Simple harmonic motion — a = −ω²x' },
      { ref: '6.4', title: 'SHM in springs and pendula — period equations' },
      { ref: '6.5', title: 'Energy in SHM — kinetic and potential energy changes' },
      { ref: '6.6', title: 'Resonance and damping' },
    ],
  },
  {
    ref: 'T7', title: 'Electric and magnetic fields',
    points: [
      { ref: '7.1', title: 'Electric fields — field strength E = F/Q = V/d' },
      { ref: '7.2', title: 'Coulomb\'s Law — F = kQ₁Q₂/r²' },
      { ref: '7.3', title: 'Capacitance — C = Q/V' },
      { ref: '7.4', title: 'Energy stored in a capacitor — E = ½CV²' },
      { ref: '7.5', title: 'Charging and discharging capacitors — time constant τ = RC' },
      { ref: '7.6', title: 'Magnetic flux density and force on a current — F = BIL' },
      { ref: '7.7', title: 'Force on a moving charge — F = BQv' },
      { ref: '7.8', title: 'Magnetic flux and Faraday\'s Law — ε = −dΦ/dt' },
      { ref: '7.9', title: 'Lenz\'s Law and induced EMF' },
      { ref: '7.10', title: 'Transformers and the National Grid' },
      { ref: '7.11', title: 'Alternating current — RMS values, peak voltage' },
    ],
  },
  {
    ref: 'T8', title: 'Nuclear and particle physics',
    points: [
      { ref: '8.1', title: 'Atomic structure — protons, neutrons, electrons' },
      { ref: '8.2', title: 'The standard model — quarks, leptons, hadrons' },
      { ref: '8.3', title: 'Alpha, beta-minus, beta-plus and gamma decay' },
      { ref: '8.4', title: 'Nuclear equations and conservation laws' },
      { ref: '8.5', title: 'Half-life and radioactive decay — A = λN' },
      { ref: '8.6', title: 'Binding energy and mass defect — E = mc²' },
      { ref: '8.7', title: 'Nuclear fission — chain reaction and critical mass' },
      { ref: '8.8', title: 'Nuclear fusion and conditions in stars' },
    ],
  },
  {
    ref: 'T9', title: 'Thermodynamics',
    points: [
      { ref: '9.1', title: 'Thermal energy transfer — conduction, convection, radiation' },
      { ref: '9.2', title: 'Specific heat capacity — Q = mcΔT' },
      { ref: '9.3', title: 'Specific latent heat — Q = mL' },
      { ref: '9.4', title: 'Ideal gas law — pV = nRT' },
      { ref: '9.5', title: 'Kinetic theory — mean kinetic energy = 3/2 kT' },
      { ref: '9.6', title: 'Internal energy and the first law of thermodynamics' },
    ],
  },
  {
    ref: 'T10', title: 'Space (optional topic)',
    points: [
      { ref: '10.1', title: 'Gravitational fields — g = GM/r²' },
      { ref: '10.2', title: 'Gravitational potential — V = −GM/r' },
      { ref: '10.3', title: 'Orbital motion and Kepler\'s Third Law — T² ∝ r³' },
      { ref: '10.4', title: 'Escape velocity' },
      { ref: '10.5', title: 'Stellar classification — HR diagram' },
      { ref: '10.6', title: 'Stellar evolution — main sequence to remnant' },
      { ref: '10.7', title: 'Hubble\'s Law and the expanding universe — v = Hd' },
      { ref: '10.8', title: 'Cosmic microwave background radiation and the Big Bang' },
    ],
  },
]

// ── Pearson Exploring Science International Year 7 ────────────────────────────

const exploringScience7Topics: SpecTopic[] = [
  {
    ref: '7A', title: 'Cells, tissues, organs and systems',
    points: [
      { ref: '7Aa', title: 'Life processes' },
      { ref: '7Ab', title: 'Organs' },
      { ref: '7Ac', title: 'Tissues' },
      { ref: '7Ad', title: 'Cells' },
      { ref: '7Ae', title: 'Organ systems' },
    ],
  },
  {
    ref: '7B', title: 'Sexual reproduction in animals',
    points: [
      { ref: '7Ba', title: 'Animal sexual reproduction' },
      { ref: '7Bb', title: 'Reproductive organs' },
      { ref: '7Bc', title: 'Becoming pregnant' },
      { ref: '7Bd', title: 'Gestation and birth' },
      { ref: '7Be', title: 'Growing up' },
    ],
  },
  {
    ref: '7C', title: 'Muscles and bones',
    points: [
      { ref: '7Ca', title: 'Muscles and breathing' },
      { ref: '7Cb', title: 'Muscles and blood' },
      { ref: '7Cc', title: 'The skeleton' },
      { ref: '7Cd', title: 'Muscles and moving' },
      { ref: '7Ce', title: 'Drugs' },
    ],
  },
  {
    ref: '7D', title: 'Ecosystems',
    points: [
      { ref: '7Da', title: 'Variation' },
      { ref: '7Db', title: 'Adaptations' },
      { ref: '7Dc', title: 'Effects of the environment' },
      { ref: '7Dd', title: 'Effects on the environment' },
      { ref: '7De', title: 'Transfers in food chains' },
    ],
  },
  {
    ref: '7E', title: 'Mixtures and separation',
    points: [
      { ref: '7Ea', title: 'Mixtures' },
      { ref: '7Eb', title: 'Solutions' },
      { ref: '7Ec', title: 'Evaporation' },
      { ref: '7Ed', title: 'Chromatography' },
      { ref: '7Ee', title: 'Distillation' },
    ],
  },
  {
    ref: '7F', title: 'Acids and alkalis',
    points: [
      { ref: '7Fa', title: 'Hazards' },
      { ref: '7Fb', title: 'Indicators' },
      { ref: '7Fc', title: 'Acidity and alkalinity' },
      { ref: '7Fd', title: 'Neutralisation' },
      { ref: '7Fe', title: 'Neutralisation in daily life' },
    ],
  },
  {
    ref: '7G', title: 'The particle model',
    points: [
      { ref: '7Ga', title: 'Solids, liquids and gases' },
      { ref: '7Gb', title: 'Particles' },
      { ref: '7Gc', title: 'Brownian motion' },
      { ref: '7Gd', title: 'Diffusion' },
      { ref: '7Ge', title: 'Air pressure' },
    ],
  },
  {
    ref: '7H', title: 'Atoms, elements and molecules',
    points: [
      { ref: '7Ha', title: 'The air we breathe' },
      { ref: '7Hb', title: "Earth's elements" },
      { ref: '7Hc', title: 'Metals and non-metals' },
      { ref: '7Hd', title: 'Making compounds' },
      { ref: '7He', title: 'Chemical reactions' },
    ],
  },
  {
    ref: '7I', title: 'Energy',
    points: [
      { ref: '7Ia', title: 'Energy and changes' },
      { ref: '7Ib', title: 'Energy transfers and stores' },
      { ref: '7Ic', title: 'Fuels' },
      { ref: '7Id', title: 'Other energy resources' },
      { ref: '7Ie', title: 'Using resources' },
    ],
  },
  {
    ref: '7J', title: 'Current electricity',
    points: [
      { ref: '7Ja', title: 'Switches and current' },
      { ref: '7Jb', title: 'Models for circuits' },
      { ref: '7Jc', title: 'Series and parallel circuits' },
      { ref: '7Jd', title: 'Changing the current' },
      { ref: '7Je', title: 'Using electricity' },
    ],
  },
  {
    ref: '7K', title: 'Forces',
    points: [
      { ref: '7Ka', title: 'Forces' },
      { ref: '7Kb', title: 'Springs' },
      { ref: '7Kc', title: 'Friction' },
      { ref: '7Kd', title: 'Pressure' },
      { ref: '7Ke', title: 'Balanced and unbalanced forces' },
    ],
  },
  {
    ref: '7L', title: 'Sound',
    points: [
      { ref: '7La', title: 'Making sounds' },
      { ref: '7Lb', title: 'Moving sounds' },
      { ref: '7Lc', title: 'Detecting sounds' },
      { ref: '7Ld', title: 'Using sound' },
      { ref: '7Le', title: 'Comparing waves' },
    ],
  },
]

// ── Pearson Exploring Science International Year 8 ────────────────────────────

const exploringScience8Topics: SpecTopic[] = [
  {
    ref: '8A', title: 'Food and nutrition',
    points: [
      { ref: '8Aa', title: 'Nutrients' },
      { ref: '8Ab', title: 'Uses of nutrients' },
      { ref: '8Ac', title: 'Balanced diets' },
      { ref: '8Ad', title: 'Digestion' },
      { ref: '8Ae', title: 'Absorption' },
    ],
  },
  {
    ref: '8B', title: 'Plants and their reproduction',
    points: [
      { ref: '8Ba', title: 'Classification and biodiversity' },
      { ref: '8Bb', title: 'Types of reproduction' },
      { ref: '8Bc', title: 'Pollination' },
      { ref: '8Bd', title: 'Fertilisation and dispersal' },
      { ref: '8Be', title: 'Germination and growth' },
    ],
  },
  {
    ref: '8C', title: 'Breathing and respiration',
    points: [
      { ref: '8Ca', title: 'Aerobic respiration' },
      { ref: '8Cb', title: 'Gas exchange system' },
      { ref: '8Cc', title: 'Getting oxygen' },
      { ref: '8Cd', title: 'Comparing gas exchange' },
      { ref: '8Ce', title: 'Anaerobic respiration' },
    ],
  },
  {
    ref: '8D', title: 'Unicellular organisms',
    points: [
      { ref: '8Da', title: 'Unicellular or multicellular' },
      { ref: '8Db', title: 'Microscopic fungi' },
      { ref: '8Dc', title: 'Bacteria' },
      { ref: '8Dd', title: 'Protoctists' },
      { ref: '8De', title: 'Decomposers and carbon' },
    ],
  },
  {
    ref: '8E', title: 'Combustion',
    points: [
      { ref: '8Ea', title: 'Burning fuels' },
      { ref: '8Eb', title: 'Oxidation' },
      { ref: '8Ec', title: 'Fire safety' },
      { ref: '8Ed', title: 'Air pollution' },
      { ref: '8Ee', title: 'Global warming' },
    ],
  },
  {
    ref: '8F', title: 'The periodic table',
    points: [
      { ref: '8Fa', title: "Dalton's atomic model" },
      { ref: '8Fb', title: 'Chemical properties' },
      { ref: '8Fc', title: "Mendeleev's table" },
      { ref: '8Fd', title: 'Physical trends' },
      { ref: '8Fe', title: 'Chemical trends' },
    ],
  },
  {
    ref: '8G', title: 'Metals and their uses',
    points: [
      { ref: '8Ga', title: 'Metal properties' },
      { ref: '8Gb', title: 'Corrosion' },
      { ref: '8Gc', title: 'Metals and water' },
      { ref: '8Gd', title: 'Metals and acids' },
      { ref: '8Ge', title: 'Pure metals and alloys' },
    ],
  },
  {
    ref: '8H', title: 'Rocks',
    points: [
      { ref: '8Ha', title: 'Rocks and their uses' },
      { ref: '8Hb', title: 'Igneous and metamorphic rocks' },
      { ref: '8Hc', title: 'Weathering and erosion' },
      { ref: '8Hd', title: 'Sedimentary rocks' },
      { ref: '8He', title: 'Materials in the Earth' },
    ],
  },
  {
    ref: '8I', title: 'Fluids',
    points: [
      { ref: '8Ia', title: 'The particle model' },
      { ref: '8Ib', title: 'Changing state' },
      { ref: '8Ic', title: 'Pressure in fluids' },
      { ref: '8Id', title: 'Floating and sinking' },
      { ref: '8Ie', title: 'Drag' },
    ],
  },
  {
    ref: '8J', title: 'Light',
    points: [
      { ref: '8Ja', title: 'Light on the move' },
      { ref: '8Jb', title: 'Reflection' },
      { ref: '8Jc', title: 'Refraction' },
      { ref: '8Jd', title: 'Cameras and eyes' },
      { ref: '8Je', title: 'Colour' },
    ],
  },
  {
    ref: '8K', title: 'Energy transfers',
    points: [
      { ref: '8Ka', title: 'Temperature changes' },
      { ref: '8Kb', title: 'Transferring energy' },
      { ref: '8Kc', title: 'Controlling transfers' },
      { ref: '8Kd', title: 'Power and efficiency' },
      { ref: '8Ke', title: 'Paying for energy' },
    ],
  },
  {
    ref: '8L', title: 'Earth and space',
    points: [
      { ref: '8La', title: 'Gathering the evidence' },
      { ref: '8Lb', title: 'Seasons' },
      { ref: '8Lc', title: 'Magnetic Earth' },
      { ref: '8Ld', title: 'Gravity in space' },
      { ref: '8Le', title: 'Beyond the Solar System' },
    ],
  },
]

// ── Pearson Exploring Science International Year 9 ────────────────────────────

const exploringScience9Topics: SpecTopic[] = [
  {
    ref: '9A', title: 'Genetics and evolution',
    points: [
      { ref: '9Aa', title: 'Environmental variation' },
      { ref: '9Ab', title: 'Inherited variation' },
      { ref: '9Ac', title: 'DNA' },
      { ref: '9Ad', title: 'Genes and extinction' },
      { ref: '9Ae', title: 'Natural selection' },
    ],
  },
  {
    ref: '9B', title: 'Plant growth',
    points: [
      { ref: '9Ba', title: 'Reactions in plants' },
      { ref: '9Bb', title: 'Plant adaptations' },
      { ref: '9Bc', title: 'Plant products' },
      { ref: '9Bd', title: 'Growing crops' },
      { ref: '9Be', title: 'Farming problems' },
    ],
  },
  {
    ref: '9C', title: 'Biology transition to further study',
    points: [
      { ref: '9Ca', title: 'Diseases' },
      { ref: '9Cb', title: 'Control systems' },
      { ref: '9Cc', title: 'Testing medicines' },
      { ref: '9Cd', title: 'Ecology' },
      { ref: '9Ce', title: 'In and out' },
    ],
  },
  {
    ref: '9E', title: 'Making materials',
    points: [
      { ref: '9Ea', title: 'About ceramics' },
      { ref: '9Eb', title: 'Polymers' },
      { ref: '9Ec', title: 'Composite materials' },
      { ref: '9Ed', title: 'Problems with materials' },
      { ref: '9Ee', title: 'Recycling materials' },
    ],
  },
  {
    ref: '9F', title: 'Reactivity',
    points: [
      { ref: '9Fa', title: 'Types of explosion' },
      { ref: '9Fb', title: 'Reactivity' },
      { ref: '9Fc', title: 'Energy and reactions' },
      { ref: '9Fd', title: 'Displacement' },
      { ref: '9Fe', title: 'Extracting metals' },
    ],
  },
  {
    ref: '9G', title: 'Chemistry transition to further study',
    points: [
      { ref: '9Ga', title: 'Ions' },
      { ref: '9Gb', title: 'Energy transfers' },
      { ref: '9Gc', title: 'Rates of reaction' },
      { ref: '9Gd', title: 'Chemical equations' },
      { ref: '9Ge', title: 'Equilibria' },
    ],
  },
  {
    ref: '9I', title: 'Forces and motion',
    points: [
      { ref: '9Ia', title: 'Forces and movement' },
      { ref: '9Ic', title: 'Speed' },
      { ref: '9Id', title: 'Turning forces' },
      { ref: '9Ie', title: 'More machines' },
    ],
  },
  {
    ref: '9J', title: 'Force fields and electromagnets',
    points: [
      { ref: '9Ja', title: 'Force fields' },
      { ref: '9Jb', title: 'Static electricity' },
      { ref: '9Jc', title: 'Current electricity' },
      { ref: '9Jd', title: 'Resistance' },
      { ref: '9Je', title: 'Electromagnets' },
    ],
  },
  {
    ref: '9K', title: 'Physics transition to further study',
    points: [
      { ref: '9Ka', title: 'Differences' },
      { ref: '9Kb', title: 'Fields' },
      { ref: '9Kc', title: 'Cause and effect' },
      { ref: '9Kd', title: 'Links between variables' },
      { ref: '9Ke', title: 'Models' },
    ],
  },
]

// ── IB Diploma Physics ────────────────────────────────────────────────────────

const ibPhysicsTopics: SpecTopic[] = [
  {
    ref: 'T1', title: 'Measurements and uncertainties',
    points: [
      { ref: '1.1', title: 'Measurements in physics — SI units, significant figures, scientific notation' },
      { ref: '1.2', title: 'Uncertainties and errors — absolute, fractional and percentage uncertainty' },
      { ref: '1.3', title: 'Vectors and scalars — addition, subtraction and resolving components' },
    ],
  },
  {
    ref: 'T2', title: 'Mechanics',
    points: [
      { ref: '2.1', title: 'Motion — displacement, velocity, acceleration and kinematics equations' },
      { ref: '2.2', title: "Forces — Newton's laws, free-body diagrams, friction" },
      { ref: '2.3', title: 'Work, energy and power — kinetic, gravitational, elastic potential energy' },
      { ref: '2.4', title: 'Momentum and impulse — conservation of momentum, collisions' },
    ],
  },
  {
    ref: 'T3', title: 'Thermal physics',
    points: [
      { ref: '3.1', title: 'Thermal concepts — temperature, internal energy, specific heat capacity' },
      { ref: '3.2', title: 'Modelling a gas — ideal gas law, Boltzmann model, pressure-volume relationships' },
    ],
  },
  {
    ref: 'T4', title: 'Waves',
    points: [
      { ref: '4.1', title: 'Oscillations — simple harmonic motion, period, amplitude, phase' },
      { ref: '4.2', title: 'Travelling waves — transverse, longitudinal, wave speed equation' },
      { ref: '4.3', title: 'Wave characteristics — intensity, superposition, polarisation' },
      { ref: '4.4', title: 'Wave behaviour — reflection, refraction, diffraction, Snell\'s law' },
      { ref: '4.5', title: 'Standing waves — nodes, antinodes, harmonics, resonance' },
    ],
  },
  {
    ref: 'T5', title: 'Electricity and magnetism',
    points: [
      { ref: '5.1', title: 'Electric fields — Coulomb\'s law, field lines, potential difference' },
      { ref: '5.2', title: 'Heating effect of electric currents — resistance, Ohm\'s law, power dissipation' },
      { ref: '5.3', title: 'Electric cells — EMF, internal resistance, terminal voltage' },
      { ref: '5.4', title: 'Magnetic effects — force on moving charges, motor effect, magnetic flux density' },
    ],
  },
  {
    ref: 'T6', title: 'Circular motion and gravitation',
    points: [
      { ref: '6.1', title: 'Circular motion — centripetal force and acceleration, angular velocity' },
      { ref: '6.2', title: "Newton's law of gravitation — gravitational field strength, orbital mechanics" },
    ],
  },
  {
    ref: 'T7', title: 'Atomic, nuclear and particle physics',
    points: [
      { ref: '7.1', title: 'Discrete energy and radioactivity — alpha, beta, gamma, half-life, decay equations' },
      { ref: '7.2', title: 'Nuclear reactions — fission, fusion, mass defect, binding energy' },
      { ref: '7.3', title: 'The structure of matter — quarks, leptons, hadrons, the Standard Model' },
    ],
  },
  {
    ref: 'T8', title: 'Energy production',
    points: [
      { ref: '8.1', title: 'Energy sources — fossil fuels, nuclear, solar, wind, hydroelectric' },
      { ref: '8.2', title: 'Thermal energy transfer — conduction, convection, radiation, black-body radiation' },
    ],
  },
  {
    ref: 'T9', title: 'Wave phenomena (HL)',
    points: [
      { ref: '9.1', title: 'Simple harmonic motion — graphical and mathematical analysis' },
      { ref: '9.2', title: 'Single-slit diffraction — intensity patterns, minima positions' },
      { ref: '9.3', title: 'Interference — double-slit, thin films, path difference' },
      { ref: '9.4', title: 'Resolution — Rayleigh criterion, resolving power' },
      { ref: '9.5', title: 'Doppler effect — moving source and observer, applications' },
    ],
  },
  {
    ref: 'T10', title: 'Fields (HL)',
    points: [
      { ref: '10.1', title: 'Describing fields — gravitational, electric and magnetic field comparisons' },
      { ref: '10.2', title: 'Fields at work — potential, orbital energy, escape velocity, potential wells' },
    ],
  },
  {
    ref: 'T11', title: 'Electromagnetic induction (HL)',
    points: [
      { ref: '11.1', title: "Electromagnetic induction — Faraday's and Lenz's law, induced EMF" },
      { ref: '11.2', title: 'Power generation and transmission — AC generators, transformers, RMS values' },
      { ref: '11.3', title: 'Capacitance — charge, voltage, energy stored, capacitors in circuits' },
    ],
  },
  {
    ref: 'T12', title: 'Quantum and nuclear physics (HL)',
    points: [
      { ref: '12.1', title: 'Interaction of matter with radiation — photoelectric effect, de Broglie, uncertainty principle' },
      { ref: '12.2', title: 'Nuclear physics — radioactive decay law, nuclear energy levels, fission and fusion calculations' },
    ],
  },
]

// ── IB Diploma Chemistry ──────────────────────────────────────────────────────

const ibChemistryTopics: SpecTopic[] = [
  {
    ref: 'T1', title: 'Stoichiometric relationships',
    points: [
      { ref: '1.1', title: 'Introduction to the particulate nature of matter and chemical change' },
      { ref: '1.2', title: 'The mole concept — Avogadro\'s number, molar mass, mole calculations' },
      { ref: '1.3', title: 'Reacting masses and volumes — limiting reagents, yield, concentration' },
    ],
  },
  {
    ref: 'T2', title: 'Atomic structure',
    points: [
      { ref: '2.1', title: 'The nuclear atom — protons, neutrons, electrons, isotopes, mass spectrometry' },
      { ref: '2.2', title: 'Electron configuration — energy levels, sub-levels, orbitals, ionisation energy' },
    ],
  },
  {
    ref: 'T3', title: 'Periodicity',
    points: [
      { ref: '3.1', title: 'Periodic table — periods, groups, blocks, electron configuration trends' },
      { ref: '3.2', title: 'Periodic trends — atomic radius, ionisation energy, electronegativity, electron affinity' },
    ],
  },
  {
    ref: 'T4', title: 'Chemical bonding and structure',
    points: [
      { ref: '4.1', title: 'Ionic bonding and structure — lattice energy, properties of ionic compounds' },
      { ref: '4.2', title: 'Covalent bonding — Lewis structures, VSEPR, bond polarity' },
      { ref: '4.3', title: 'Covalent structures — giant covalent, allotropes of carbon, fullerenes' },
      { ref: '4.4', title: 'Intermolecular forces — London dispersion, dipole-dipole, hydrogen bonding' },
      { ref: '4.5', title: 'Metallic bonding — sea of electrons model, properties of metals' },
    ],
  },
  {
    ref: 'T5', title: 'Energetics and thermochemistry',
    points: [
      { ref: '5.1', title: "Measuring energy changes — enthalpy, calorimetry, Hess's law" },
      { ref: '5.2', title: "Hess's law and energy cycles — Born-Haber cycles (HL)" },
      { ref: '5.3', title: 'Bond enthalpies — bond breaking and forming, mean bond enthalpies' },
    ],
  },
  {
    ref: 'T6', title: 'Chemical kinetics',
    points: [
      { ref: '6.1', title: 'Collision theory — activation energy, Maxwell-Boltzmann distribution, factors affecting rate' },
    ],
  },
  {
    ref: 'T7', title: 'Equilibrium',
    points: [
      { ref: '7.1', title: "Dynamic equilibrium — Le Chatelier's principle, Kc expression, equilibrium calculations" },
    ],
  },
  {
    ref: 'T8', title: 'Acids and bases',
    points: [
      { ref: '8.1', title: 'Theories of acids and bases — Brønsted-Lowry, conjugate pairs' },
      { ref: '8.2', title: 'Properties of acids and bases — reactions with metals, carbonates, bases' },
      { ref: '8.3', title: 'The pH scale — pOH, Kw, strong and weak acids/bases' },
      { ref: '8.4', title: 'Strong and weak acids/bases — Ka, Kb, degree of dissociation' },
      { ref: '8.5', title: 'Acid deposition — causes, consequences, solutions' },
    ],
  },
  {
    ref: 'T9', title: 'Redox processes',
    points: [
      { ref: '9.1', title: 'Oxidation and reduction — oxidation numbers, half-equations, balancing redox' },
      { ref: '9.2', title: 'Electrochemical cells — standard electrode potentials, electrolysis, Faraday\'s laws' },
    ],
  },
  {
    ref: 'T10', title: 'Organic chemistry',
    points: [
      { ref: '10.1', title: 'Fundamentals — homologous series, naming (IUPAC), structural isomers' },
      { ref: '10.2', title: 'Functional group chemistry — alkanes, alkenes, alcohols, halogenoalkanes, aldehydes, ketones, carboxylic acids, esters' },
    ],
  },
  {
    ref: 'T11', title: 'Measurement and data processing',
    points: [
      { ref: '11.1', title: 'Uncertainties and errors — systematic vs random, propagation of uncertainty' },
      { ref: '11.2', title: 'Graphical techniques — drawing, interpreting and linearising graphs' },
      { ref: '11.3', title: 'Spectroscopic identification — IR, mass spectrometry, NMR' },
    ],
  },
  {
    ref: 'T12', title: 'Atomic structure (HL)',
    points: [
      { ref: '12.1', title: 'Electrons in atoms — quantum numbers, Aufbau principle, exceptions to electron configuration' },
    ],
  },
  {
    ref: 'T14', title: 'Chemical bonding and structure (HL)',
    points: [
      { ref: '14.1', title: 'Further covalent bonding — formal charge, resonance, expanded octets, molecular orbital theory' },
      { ref: '14.2', title: 'Hybridisation — sp, sp², sp³ and bond angles' },
    ],
  },
  {
    ref: 'T15', title: 'Energetics and thermochemistry (HL)',
    points: [
      { ref: '15.1', title: 'Energy cycles — Born-Haber cycles, lattice enthalpies, electron affinity' },
      { ref: '15.2', title: 'Entropy and spontaneity — Gibbs free energy, ΔG = ΔH – TΔS' },
    ],
  },
  {
    ref: 'T16', title: 'Chemical kinetics (HL)',
    points: [
      { ref: '16.1', title: 'Rate expression and reaction mechanism — rate laws, order of reaction, rate-determining step' },
      { ref: '16.2', title: 'Activation energy — Arrhenius equation, graphical determination of Ea' },
    ],
  },
  {
    ref: 'T17', title: 'Equilibrium (HL)',
    points: [
      { ref: '17.1', title: 'Equilibrium law — Kc and Kp expressions, relationship between Kc and Kp' },
    ],
  },
  {
    ref: 'T18', title: 'Acids and bases (HL)',
    points: [
      { ref: '18.1', title: 'Lewis acids and bases — definition, examples, applications' },
      { ref: '18.2', title: 'Calculations involving acids and bases — buffer solutions, hydrolysis of salts' },
      { ref: '18.3', title: 'pH curves — titration curves, equivalence point, indicators' },
    ],
  },
  {
    ref: 'T20', title: 'Organic chemistry (HL)',
    points: [
      { ref: '20.1', title: 'Types of organic reactions — mechanisms: SN1, SN2, electrophilic addition' },
      { ref: '20.2', title: 'Synthetic routes — multi-step synthesis, retrosynthesis' },
      { ref: '20.3', title: 'Stereoisomerism — optical isomers, enantiomers, racemic mixtures' },
    ],
  },
]

// ── IB Diploma Biology ────────────────────────────────────────────────────────

const ibBiologyTopics: SpecTopic[] = [
  {
    ref: 'T1', title: 'Cell biology',
    points: [
      { ref: '1.1', title: 'Introduction to cells — cell theory, prokaryotic vs eukaryotic, surface area to volume ratio' },
      { ref: '1.2', title: 'Ultrastructure of cells — organelles: nucleus, mitochondria, chloroplast, ER, Golgi' },
      { ref: '1.3', title: 'Membrane structure — fluid mosaic model, phospholipid bilayer' },
      { ref: '1.4', title: 'Membrane transport — diffusion, osmosis, active transport, endocytosis, exocytosis' },
      { ref: '1.5', title: 'The origin of cells — spontaneous generation debate, endosymbiotic theory' },
      { ref: '1.6', title: 'Cell division — mitosis, cytokinesis, cell cycle, cancer' },
    ],
  },
  {
    ref: 'T2', title: 'Molecular biology',
    points: [
      { ref: '2.1', title: 'Molecules to metabolism — anabolism, catabolism, metabolic reactions' },
      { ref: '2.2', title: 'Water — properties and significance (cohesion, solvent, thermal properties)' },
      { ref: '2.3', title: 'Carbohydrates and lipids — monosaccharides, polysaccharides, triglycerides, phospholipids' },
      { ref: '2.4', title: 'Proteins — amino acids, peptide bonds, primary–quaternary structure, fibrous vs globular' },
      { ref: '2.5', title: 'Enzymes — active site, induced fit, denaturation, inhibition, cofactors' },
      { ref: '2.6', title: 'Structure of DNA and RNA — nucleotides, double helix, antiparallel strands, base pairing' },
      { ref: '2.7', title: 'DNA replication, transcription and translation — semi-conservative replication, codons, ribosomes' },
      { ref: '2.8', title: 'Cell respiration — glycolysis, Krebs cycle, oxidative phosphorylation, ATP yield' },
      { ref: '2.9', title: 'Photosynthesis — light-dependent and light-independent reactions, limiting factors' },
    ],
  },
  {
    ref: 'T3', title: 'Genetics',
    points: [
      { ref: '3.1', title: 'Genes — alleles, genotype, phenotype, dominant and recessive' },
      { ref: '3.2', title: 'Chromosomes — karyotype, homologous chromosomes, sex determination' },
      { ref: '3.3', title: 'Meiosis — stages, crossing over, independent assortment, genetic variation' },
      { ref: '3.4', title: 'Inheritance — monohybrid, dihybrid, sex-linked, codominance, incomplete dominance' },
      { ref: '3.5', title: 'Genetic modification and biotechnology — PCR, gel electrophoresis, GMOs, CRISPR' },
    ],
  },
  {
    ref: 'T4', title: 'Ecology',
    points: [
      { ref: '4.1', title: 'Species, communities and ecosystems — abiotic and biotic factors, niches, succession' },
      { ref: '4.2', title: 'Energy flow — food chains, trophic levels, efficiency of energy transfer, pyramids' },
      { ref: '4.3', title: 'Carbon cycling — photosynthesis, respiration, decomposition, combustion, carbon sinks' },
      { ref: '4.4', title: 'Climate change — greenhouse gases, global warming, impact on biodiversity' },
    ],
  },
  {
    ref: 'T5', title: 'Evolution and biodiversity',
    points: [
      { ref: '5.1', title: 'Evidence for evolution — fossil record, comparative anatomy, molecular evidence' },
      { ref: '5.2', title: 'Natural selection — variation, selection pressure, adaptation, speciation' },
      { ref: '5.3', title: 'Classification of biodiversity — taxonomy, binomial nomenclature, domains, kingdoms' },
      { ref: '5.4', title: 'Cladistics — cladograms, derived characteristics, molecular phylogenetics' },
    ],
  },
  {
    ref: 'T6', title: 'Human physiology',
    points: [
      { ref: '6.1', title: 'Digestion and absorption — alimentary canal, enzymes, villi and microvilli, absorption' },
      { ref: '6.2', title: 'The blood system — heart, blood vessels, cardiac cycle, double circulation, clotting' },
      { ref: '6.3', title: 'Defence against infectious disease — skin, phagocytosis, lymphocytes, antibodies, vaccination' },
      { ref: '6.4', title: 'Gas exchange — alveoli, ventilation, haemoglobin, oxygen dissociation curve' },
      { ref: '6.5', title: 'Neurons and synapses — resting and action potential, synaptic transmission, drugs' },
      { ref: '6.6', title: 'Hormones, homeostasis and reproduction — insulin, glucagon, ADH, menstrual cycle, IVF' },
    ],
  },
  {
    ref: 'T7', title: 'Nucleic acids (HL)',
    points: [
      { ref: '7.1', title: 'DNA structure and replication — Meselson-Stahl experiment, DNA polymerase, Okazaki fragments' },
      { ref: '7.2', title: 'Transcription and gene expression — promoters, RNA polymerase, post-transcriptional modification' },
      { ref: '7.3', title: 'Translation — ribosomes, tRNA, polysomes, post-translational modification' },
    ],
  },
  {
    ref: 'T8', title: 'Metabolism, cell respiration and photosynthesis (HL)',
    points: [
      { ref: '8.1', title: 'Metabolism — enzyme inhibition, allosteric regulation, metabolic pathways' },
      { ref: '8.2', title: 'Cell respiration — detailed glycolysis, link reaction, Krebs cycle, chemiosmosis' },
      { ref: '8.3', title: 'Photosynthesis — light reactions, Calvin cycle, carbon fixation, C4 and CAM plants' },
    ],
  },
  {
    ref: 'T9', title: 'Plant biology (HL)',
    points: [
      { ref: '9.1', title: 'Transport in xylem — transpiration stream, cohesion-tension, factors affecting transpiration' },
      { ref: '9.2', title: 'Transport in phloem — source to sink, mass flow hypothesis' },
      { ref: '9.3', title: 'Growth in plants — auxins, phototropism, gravitropism, gibberellins' },
      { ref: '9.4', title: 'Reproduction in plants — flowers, pollination, fertilisation, seed and fruit development' },
    ],
  },
  {
    ref: 'T10', title: 'Genetics and evolution (HL)',
    points: [
      { ref: '10.1', title: 'Meiosis — chiasmata, non-disjunction, aneuploidy, chromosome mutations' },
      { ref: '10.2', title: 'Inheritance — chi-squared test, linkage, epistasis, polygenic inheritance' },
      { ref: '10.3', title: 'Gene pools and speciation — allele frequency, Hardy-Weinberg, isolation, allopatric speciation' },
    ],
  },
  {
    ref: 'T11', title: 'Animal physiology (HL)',
    points: [
      { ref: '11.1', title: 'Antibody production and vaccination — clonal selection, monoclonal antibodies, immunological memory' },
      { ref: '11.2', title: 'Movement — bones, joints, sarcomere, sliding filament theory, fast vs slow twitch muscle' },
      { ref: '11.3', title: 'The kidney and osmoregulation — nephron, filtration, reabsorption, loop of Henle, ADH' },
      { ref: '11.4', title: 'Sexual reproduction — gametogenesis, menstrual cycle, fertilisation, pregnancy, birth' },
    ],
  },
]

// ── Edexcel GCSE Chemistry (1CH0) ─────────────────────────────────────────────

const edexcelGCSEChemTopics: SpecTopic[] = [
  {
    ref: 'T1', title: 'Key concepts in chemistry',
    points: [
      { ref: '1.1', title: 'Atomic structure (protons, neutrons, electrons)' },
      { ref: '1.2', title: 'The periodic table — groups, periods and properties' },
      { ref: '1.3', title: 'Relative atomic mass and isotopes' },
      { ref: '1.4', title: 'Electronic structure' },
      { ref: '1.5', title: 'Ionic bonding — electron transfer and ionic lattices' },
      { ref: '1.6', title: 'Covalent bonding — electron sharing and molecular structures' },
      { ref: '1.7', title: 'Metallic bonding and properties of metals' },
      { ref: '1.8', title: 'Giant covalent structures (diamond, graphite, graphene)' },
      { ref: '1.9', title: 'States of matter and changes of state' },
      { ref: '1.10', title: 'Pure substances and mixtures — Rf values and melting points' },
    ],
  },
  {
    ref: 'T2', title: 'States of matter and mixtures',
    points: [
      { ref: '2.1', title: 'The particle model — solids, liquids and gases' },
      { ref: '2.2', title: 'Heating and cooling curves' },
      { ref: '2.3', title: 'Filtration, crystallisation and evaporation' },
      { ref: '2.4', title: 'Simple and fractional distillation' },
      { ref: '2.5', title: 'Paper and thin layer chromatography' },
      { ref: '2.6', title: 'Formulations and their uses' },
    ],
  },
  {
    ref: 'T3', title: 'Chemical changes',
    points: [
      { ref: '3.1', title: 'The reactivity series of metals' },
      { ref: '3.2', title: 'Reactions of metals with water and dilute acids' },
      { ref: '3.3', title: 'Displacement reactions' },
      { ref: '3.4', title: 'Oxidation and reduction (redox)' },
      { ref: '3.5', title: 'Acids and alkalis — pH scale and indicators' },
      { ref: '3.6', title: 'Neutralisation and the preparation of salts' },
      { ref: '3.7', title: 'Reactions of acids with metals, bases and carbonates' },
      { ref: '3.8', title: 'Electrolysis — principles and half equations' },
      { ref: '3.9', title: 'Electrolysis of solutions (copper sulfate, brine)' },
    ],
  },
  {
    ref: 'T4', title: 'Extracting metals and equilibria',
    points: [
      { ref: '4.1', title: 'Extraction of iron in the blast furnace' },
      { ref: '4.2', title: 'Extraction of aluminium by electrolysis' },
      { ref: '4.3', title: 'Rusting of iron and methods of prevention' },
      { ref: '4.4', title: 'Alloys and their uses (steel, brass, bronze)' },
      { ref: '4.5', title: 'Life cycle assessment and recycling of materials' },
      { ref: '4.6', title: 'Dynamic equilibrium and Le Chatelier\'s principle (Higher)' },
    ],
  },
  {
    ref: 'T5', title: 'Separate chemistry 1 (Higher tier)',
    points: [
      { ref: '5.1', title: 'Moles and the mole concept (Avogadro\'s number)' },
      { ref: '5.2', title: 'Calculations from equations — reacting quantities' },
      { ref: '5.3', title: 'Percentage yield' },
      { ref: '5.4', title: 'Atom economy' },
      { ref: '5.5', title: 'Concentration of solutions (mol/dm³)' },
      { ref: '5.6', title: 'Acid–base titrations and calculations' },
    ],
  },
  {
    ref: 'T6', title: 'Groups in the periodic table',
    points: [
      { ref: '6.1', title: 'The noble gases (Group 0) — properties and uses' },
      { ref: '6.2', title: 'The alkali metals (Group 1) — reactions and trends' },
      { ref: '6.3', title: 'The halogens (Group 7) — reactions and trends' },
      { ref: '6.4', title: 'Displacement reactions of halogens' },
      { ref: '6.5', title: 'Transition metals — properties and catalysts' },
    ],
  },
  {
    ref: 'T7', title: 'Rates of reaction and energy changes',
    points: [
      { ref: '7.1', title: 'Rates of reaction — measuring and calculating' },
      { ref: '7.2', title: 'Collision theory' },
      { ref: '7.3', title: 'Effect of temperature on rate of reaction' },
      { ref: '7.4', title: 'Effect of concentration and pressure on rate' },
      { ref: '7.5', title: 'Effect of surface area and catalysts' },
      { ref: '7.6', title: 'Exothermic and endothermic reactions' },
      { ref: '7.7', title: 'Energy profile diagrams and activation energy' },
      { ref: '7.8', title: 'Bond energies — calculating energy changes' },
    ],
  },
  {
    ref: 'T8', title: 'Fuels and Earth science',
    points: [
      { ref: '8.1', title: 'Fossil fuels and crude oil' },
      { ref: '8.2', title: 'Fractional distillation of crude oil' },
      { ref: '8.3', title: 'Alkanes — naming, formulae and combustion' },
      { ref: '8.4', title: 'Incomplete combustion and atmospheric pollutants' },
      { ref: '8.5', title: 'Cracking of hydrocarbons (thermal and catalytic)' },
      { ref: '8.6', title: 'The greenhouse effect and climate change' },
      { ref: '8.7', title: 'The carbon cycle' },
      { ref: '8.8', title: 'Potable water — treatment and purification' },
    ],
  },
  {
    ref: 'T9', title: 'Separate chemistry 2 (Higher tier)',
    points: [
      { ref: '9.1', title: 'Alcohols — properties, reactions and uses' },
      { ref: '9.2', title: 'Carboxylic acids — properties and reactions' },
      { ref: '9.3', title: 'Esters — formation and uses' },
      { ref: '9.4', title: 'Addition polymerisation' },
      { ref: '9.5', title: 'Condensation polymerisation' },
      { ref: '9.6', title: 'Natural polymers — proteins, starch and DNA' },
      { ref: '9.7', title: 'Nanoparticles — properties and uses' },
    ],
  },
]

// ── AQA GCSE Physics (8463) ──────────────────────────────────────────────────

const aqaGCSEPhysicsTopics: SpecTopic[] = [
  {
    ref: 'P1', title: 'Energy',
    points: [
      { ref: 'P1.1', title: 'Energy stores and transfers' },
      { ref: 'P1.2', title: 'Conservation and dissipation of energy' },
      { ref: 'P1.3', title: 'National and global energy resources' },
      { ref: 'P1.4', title: 'Calculating energy changes — kinetic, gravitational, elastic' },
      { ref: 'P1.5', title: 'Power — P = E/t' },
      { ref: 'P1.6', title: 'Efficiency of energy transfer' },
    ],
  },
  {
    ref: 'P2', title: 'Electricity',
    points: [
      { ref: 'P2.1', title: 'Standard circuit symbols and diagrams' },
      { ref: 'P2.2', title: 'Electric charge, current and potential difference' },
      { ref: 'P2.3', title: 'Resistance — V = IR' },
      { ref: 'P2.4', title: 'Series and parallel circuits' },
      { ref: 'P2.5', title: 'I–V characteristics — resistor, filament lamp, diode' },
      { ref: 'P2.6', title: 'Electrical power — P = VI' },
      { ref: 'P2.7', title: 'Mains electricity — AC, frequency, UK plug wiring' },
      { ref: 'P2.8', title: 'Static electricity and electric fields' },
    ],
  },
  {
    ref: 'P3', title: 'Particle model of matter',
    points: [
      { ref: 'P3.1', title: 'Density — ρ = m/V' },
      { ref: 'P3.2', title: 'Changes of state and latent heat — Q = mL' },
      { ref: 'P3.3', title: 'Specific heat capacity — Q = mcΔT' },
      { ref: 'P3.4', title: 'Particle model and pressure in gases' },
    ],
  },
  {
    ref: 'P4', title: 'Atomic structure',
    points: [
      { ref: 'P4.1', title: 'Atomic structure — protons, neutrons, electrons, isotopes' },
      { ref: 'P4.2', title: 'Development of the atomic model — plum pudding to nuclear' },
      { ref: 'P4.3', title: 'Radioactive decay — alpha, beta, gamma, half-life' },
      { ref: 'P4.4', title: 'Nuclear equations for alpha and beta decay' },
      { ref: 'P4.5', title: 'Hazards and uses of radioactivity' },
      { ref: 'P4.6', title: 'Nuclear fission and fusion' },
    ],
  },
  {
    ref: 'P5', title: 'Forces',
    points: [
      { ref: 'P5.1', title: 'Scalar and vector quantities; resultant forces' },
      { ref: 'P5.2', title: 'Contact and non-contact forces' },
      { ref: 'P5.3', title: 'Newton\'s First Law — inertia and balanced forces' },
      { ref: 'P5.4', title: 'Newton\'s Second Law — F = ma' },
      { ref: 'P5.5', title: 'Newton\'s Third Law — action–reaction pairs' },
      { ref: 'P5.6', title: 'Stopping distance — thinking and braking distance' },
      { ref: 'P5.7', title: 'Momentum — p = mv and conservation of momentum' },
      { ref: 'P5.8', title: 'Work done and energy transfer — W = Fs' },
      { ref: 'P5.9', title: 'Elasticity — Hooke\'s Law and spring constant' },
      { ref: 'P5.10', title: 'Moments, levers and gears' },
      { ref: 'P5.11', title: 'Pressure — fluids, upthrust and Archimedes\' principle' },
    ],
  },
  {
    ref: 'P6', title: 'Waves',
    points: [
      { ref: 'P6.1', title: 'Transverse and longitudinal waves — properties and examples' },
      { ref: 'P6.2', title: 'Wave equation — v = fλ' },
      { ref: 'P6.3', title: 'Reflection, refraction and sound' },
      { ref: 'P6.4', title: 'The electromagnetic spectrum — properties and uses' },
      { ref: 'P6.5', title: 'Lenses — ray diagrams, focal length, real and virtual images' },
      { ref: 'P6.6', title: 'Colour, filters and absorption of light' },
      { ref: 'P6.7', title: 'Infrared radiation and temperature' },
    ],
  },
  {
    ref: 'P7', title: 'Magnetism and electromagnetism',
    points: [
      { ref: 'P7.1', title: 'Permanent and induced magnetism; field patterns' },
      { ref: 'P7.2', title: 'The motor effect — F = BIL, Fleming\'s Left-Hand Rule' },
      { ref: 'P7.3', title: 'The electric motor and loudspeaker' },
      { ref: 'P7.4', title: 'Electromagnetic induction — Faraday\'s Law' },
      { ref: 'P7.5', title: 'Alternators, generators and microphones' },
      { ref: 'P7.6', title: 'Transformers — step-up, step-down, the National Grid' },
    ],
  },
  {
    ref: 'P8', title: 'Space physics (separate science only)',
    points: [
      { ref: 'P8.1', title: 'The Solar System — structure and scale' },
      { ref: 'P8.2', title: 'The life cycle of stars' },
      { ref: 'P8.3', title: 'Orbital motion — speed, radius and gravitational force' },
      { ref: 'P8.4', title: 'Red-shift and the expanding universe' },
      { ref: 'P8.5', title: 'The Big Bang theory and evidence' },
    ],
  },
]

// ── AQA GCSE Biology (8461) ──────────────────────────────────────────────────

const aqaGCSEBiologyTopics: SpecTopic[] = [
  {
    ref: 'B1', title: 'Cell biology',
    points: [
      { ref: 'B1.1', title: 'Eukaryotic and prokaryotic cells — structure and function' },
      { ref: 'B1.2', title: 'Animal and plant cell structures and their functions' },
      { ref: 'B1.3', title: 'Cell specialisation and differentiation' },
      { ref: 'B1.4', title: 'Microscopy — light microscope, magnification calculations' },
      { ref: 'B1.5', title: 'Mitosis and the cell cycle' },
      { ref: 'B1.6', title: 'Stem cells — therapeutic uses and ethical issues' },
      { ref: 'B1.7', title: 'Transport — diffusion, osmosis and active transport' },
    ],
  },
  {
    ref: 'B2', title: 'Organisation',
    points: [
      { ref: 'B2.1', title: 'Tissues, organs and organ systems' },
      { ref: 'B2.2', title: 'The digestive system — enzymes and digestion' },
      { ref: 'B2.3', title: 'The heart and blood vessels — structure and function' },
      { ref: 'B2.4', title: 'Blood components and their functions' },
      { ref: 'B2.5', title: 'Non-communicable diseases — risk factors and correlation' },
      { ref: 'B2.6', title: 'Cancer — tumour types, risk factors, treatment' },
      { ref: 'B2.7', title: 'Plant organisation — roots, stems, leaves; transpiration' },
    ],
  },
  {
    ref: 'B3', title: 'Infection and response',
    points: [
      { ref: 'B3.1', title: 'Communicable diseases — bacteria, viruses, fungi, protists' },
      { ref: 'B3.2', title: 'Viral diseases — measles, HIV, TMV' },
      { ref: 'B3.3', title: 'Bacterial diseases — Salmonella, Gonorrhoea' },
      { ref: 'B3.4', title: 'The human immune system — phagocytosis, antibodies, memory cells' },
      { ref: 'B3.5', title: 'Vaccination — herd immunity, pros and cons' },
      { ref: 'B3.6', title: 'Antibiotics and antibiotic resistance' },
      { ref: 'B3.7', title: 'Drug discovery and clinical trials' },
    ],
  },
  {
    ref: 'B4', title: 'Bioenergetics',
    points: [
      { ref: 'B4.1', title: 'Photosynthesis — equation and limiting factors' },
      { ref: 'B4.2', title: 'Uses of glucose in plants' },
      { ref: 'B4.3', title: 'Factors affecting rate of photosynthesis — light, CO₂, temperature' },
      { ref: 'B4.4', title: 'Aerobic respiration — equation and uses of energy' },
      { ref: 'B4.5', title: 'Anaerobic respiration — fermentation and lactic acid' },
      { ref: 'B4.6', title: 'Response to exercise — heart rate, breathing rate, oxygen debt' },
    ],
  },
  {
    ref: 'B5', title: 'Homeostasis and response',
    points: [
      { ref: 'B5.1', title: 'Homeostasis — the principle of negative feedback' },
      { ref: 'B5.2', title: 'The nervous system — receptors, CNS, effectors, reflex arc' },
      { ref: 'B5.3', title: 'Hormones and the endocrine system — glands and hormones' },
      { ref: 'B5.4', title: 'Control of blood glucose — insulin, glucagon, diabetes' },
      { ref: 'B5.5', title: 'Controlling body temperature — vasodilation, shivering' },
      { ref: 'B5.6', title: 'Reproduction — the menstrual cycle, FSH, LH, oestrogen' },
      { ref: 'B5.7', title: 'Contraception — hormonal and non-hormonal methods' },
      { ref: 'B5.8', title: 'The kidney — filtration, reabsorption, urine production' },
    ],
  },
  {
    ref: 'B6', title: 'Inheritance, variation and evolution',
    points: [
      { ref: 'B6.1', title: 'Sexual and asexual reproduction — advantages and disadvantages' },
      { ref: 'B6.2', title: 'DNA, genes and chromosomes' },
      { ref: 'B6.3', title: 'Mitosis and meiosis compared' },
      { ref: 'B6.4', title: 'Inheritance — dominant, recessive; Punnett squares' },
      { ref: 'B6.5', title: 'Inherited disorders — cystic fibrosis, polydactyly' },
      { ref: 'B6.6', title: 'Natural selection and evolution' },
      { ref: 'B6.7', title: 'Genetic engineering — pros, cons, applications' },
      { ref: 'B6.8', title: 'Classification — kingdoms, species concept, evolutionary trees' },
    ],
  },
  {
    ref: 'B7', title: 'Ecology',
    points: [
      { ref: 'B7.1', title: 'Ecosystems — abiotic and biotic factors' },
      { ref: 'B7.2', title: 'Sampling techniques — quadrats and transects' },
      { ref: 'B7.3', title: 'Food chains, food webs and energy transfer' },
      { ref: 'B7.4', title: 'The carbon cycle' },
      { ref: 'B7.5', title: 'The water cycle and nitrogen cycle' },
      { ref: 'B7.6', title: 'Biodiversity — threats and conservation' },
      { ref: 'B7.7', title: 'Global warming — causes, effects and solutions' },
      { ref: 'B7.8', title: 'Decomposition — factors affecting decay rates' },
    ],
  },
]

// ── AQA GCSE Chemistry (8462) ────────────────────────────────────────────────

const aqaGCSEChemistryTopics: SpecTopic[] = [
  {
    ref: 'C1', title: 'Atomic structure and the periodic table',
    points: [
      { ref: 'C1.1', title: 'Atomic structure — protons, neutrons, electrons' },
      { ref: 'C1.2', title: 'Atoms, elements and compounds' },
      { ref: 'C1.3', title: 'Isotopes and relative atomic mass' },
      { ref: 'C1.4', title: 'Electronic structure — shells and sub-shells' },
      { ref: 'C1.5', title: 'The periodic table — groups, periods and properties' },
      { ref: 'C1.6', title: 'Metals and non-metals — properties and reactivity' },
      { ref: 'C1.7', title: 'Group 1 — alkali metals; Group 7 — halogens; Group 0 — noble gases' },
    ],
  },
  {
    ref: 'C2', title: 'Bonding, structure and properties',
    points: [
      { ref: 'C2.1', title: 'Ionic bonding — electron transfer, ionic lattices' },
      { ref: 'C2.2', title: 'Covalent bonding — electron sharing, molecular and giant structures' },
      { ref: 'C2.3', title: 'Metallic bonding and properties of metals' },
      { ref: 'C2.4', title: 'Giant covalent structures — diamond, graphite, graphene' },
      { ref: 'C2.5', title: 'Nanoparticles — properties and uses' },
    ],
  },
  {
    ref: 'C3', title: 'Quantitative chemistry',
    points: [
      { ref: 'C3.1', title: 'Conservation of mass and balancing equations' },
      { ref: 'C3.2', title: 'Relative formula mass (Mr) calculations' },
      { ref: 'C3.3', title: 'The mole — Avogadro\'s number, molar mass' },
      { ref: 'C3.4', title: 'Reacting masses and limiting reactants' },
      { ref: 'C3.5', title: 'Percentage yield and atom economy' },
      { ref: 'C3.6', title: 'Concentrations of solutions (g/dm³ and mol/dm³)' },
    ],
  },
  {
    ref: 'C4', title: 'Chemical changes',
    points: [
      { ref: 'C4.1', title: 'Reactivity series and metal extraction' },
      { ref: 'C4.2', title: 'Oxidation and reduction in terms of oxygen and electrons' },
      { ref: 'C4.3', title: 'Acids and alkalis — pH, indicators, neutralisation' },
      { ref: 'C4.4', title: 'Preparation of salts — from acids and bases/carbonates' },
      { ref: 'C4.5', title: 'Electrolysis — principles, products and half-equations' },
      { ref: 'C4.6', title: 'Electrolysis of solutions — chlorine, hydrogen, oxygen' },
    ],
  },
  {
    ref: 'C5', title: 'Energy changes',
    points: [
      { ref: 'C5.1', title: 'Exothermic and endothermic reactions' },
      { ref: 'C5.2', title: 'Energy profile diagrams — activation energy' },
      { ref: 'C5.3', title: 'Bond energies — calculating ΔH' },
      { ref: 'C5.4', title: 'Cells and fuel cells — energy from electrochemical reactions' },
    ],
  },
  {
    ref: 'C6', title: 'Rate of reaction and equilibrium',
    points: [
      { ref: 'C6.1', title: 'Measuring rate of reaction — mass, volume, colour' },
      { ref: 'C6.2', title: 'Collision theory — concentration, temperature, surface area, catalysts' },
      { ref: 'C6.3', title: 'Reversible reactions and dynamic equilibrium' },
      { ref: 'C6.4', title: 'Le Chatelier\'s principle — shifting equilibrium' },
    ],
  },
  {
    ref: 'C7', title: 'Organic chemistry',
    points: [
      { ref: 'C7.1', title: 'Crude oil, hydrocarbons and fractional distillation' },
      { ref: 'C7.2', title: 'Alkanes — structure, naming, combustion' },
      { ref: 'C7.3', title: 'Cracking and alkenes' },
      { ref: 'C7.4', title: 'Alcohols — structure, properties, fermentation' },
      { ref: 'C7.5', title: 'Carboxylic acids — properties and reactions' },
      { ref: 'C7.6', title: 'Addition and condensation polymerisation' },
    ],
  },
  {
    ref: 'C8', title: 'Chemical analysis',
    points: [
      { ref: 'C8.1', title: 'Pure substances and formulations — melting point tests' },
      { ref: 'C8.2', title: 'Chromatography — Rf values and interpretation' },
      { ref: 'C8.3', title: 'Flame tests — identifying metal ions' },
      { ref: 'C8.4', title: 'Chemical tests for ions — hydroxide precipitates, carbonates, halides' },
    ],
  },
  {
    ref: 'C9', title: 'Chemistry of the atmosphere',
    points: [
      { ref: 'C9.1', title: 'Earth\'s early atmosphere — composition and change over time' },
      { ref: 'C9.2', title: 'The carbon cycle and greenhouse gases' },
      { ref: 'C9.3', title: 'Climate change — evidence and consequences' },
      { ref: 'C9.4', title: 'Atmospheric pollutants — NOₓ, SO₂, CO, particulates' },
    ],
  },
  {
    ref: 'C10', title: 'Using resources',
    points: [
      { ref: 'C10.1', title: 'Finite and renewable resources; sustainability' },
      { ref: 'C10.2', title: 'Potable water — treatment methods' },
      { ref: 'C10.3', title: 'Waste water treatment' },
      { ref: 'C10.4', title: 'Corrosion — rusting, prevention methods' },
      { ref: 'C10.5', title: 'Alloys — properties and uses' },
      { ref: 'C10.6', title: 'Life cycle assessment and recycling' },
    ],
  },
]

// ── OCR Gateway GCSE Physics (J249) ──────────────────────────────────────────

const ocrGatewayGCSEPhysicsTopics: SpecTopic[] = [
  {
    ref: 'P1', title: 'Matter',
    points: [
      { ref: 'P1a', title: 'The particle model — states of matter and changes of state' },
      { ref: 'P1b', title: 'Pressure — in gases and fluids' },
      { ref: 'P1c', title: 'Density and upthrust' },
    ],
  },
  {
    ref: 'P2', title: 'Forces',
    points: [
      { ref: 'P2a', title: 'Motion — distance, speed, velocity and acceleration' },
      { ref: 'P2b', title: 'Newton\'s Laws and resultant forces' },
      { ref: 'P2c', title: 'Work, energy and power' },
      { ref: 'P2d', title: 'Momentum and its conservation' },
      { ref: 'P2e', title: 'Stopping distances and reaction time' },
    ],
  },
  {
    ref: 'P3', title: 'Electricity',
    points: [
      { ref: 'P3a', title: 'Circuits — current, voltage and resistance' },
      { ref: 'P3b', title: 'Series and parallel circuits' },
      { ref: 'P3c', title: 'Electrical power and energy' },
      { ref: 'P3d', title: 'Static electricity and electric fields' },
      { ref: 'P3e', title: 'Mains electricity — hazards and safety' },
    ],
  },
  {
    ref: 'P4', title: 'Magnetism and magnetic effects of current',
    points: [
      { ref: 'P4a', title: 'Magnetic fields — permanent magnets and field patterns' },
      { ref: 'P4b', title: 'The motor effect — F = BIL' },
      { ref: 'P4c', title: 'Electromagnetic induction and transformers' },
    ],
  },
  {
    ref: 'P5', title: 'Waves in matter',
    points: [
      { ref: 'P5a', title: 'Wave properties — amplitude, frequency, wavelength, speed' },
      { ref: 'P5b', title: 'The electromagnetic spectrum — properties and uses' },
      { ref: 'P5c', title: 'Reflection, refraction and total internal reflection' },
      { ref: 'P5d', title: 'Sound — transmission, echo and ultrasound' },
    ],
  },
  {
    ref: 'P6', title: 'Radioactive emissions',
    points: [
      { ref: 'P6a', title: 'Atomic structure — the nucleus and electrons' },
      { ref: 'P6b', title: 'Radioactive decay — alpha, beta, gamma; half-life' },
      { ref: 'P6c', title: 'Uses and hazards of ionising radiation' },
      { ref: 'P6d', title: 'Nuclear fission and fusion' },
    ],
  },
  {
    ref: 'P7', title: 'Energy',
    points: [
      { ref: 'P7a', title: 'Energy stores, transfers and dissipation' },
      { ref: 'P7b', title: 'Efficiency and reducing energy losses' },
      { ref: 'P7c', title: 'Renewable and non-renewable energy resources' },
      { ref: 'P7d', title: 'The National Grid — transmission and transformers' },
    ],
  },
  {
    ref: 'P8', title: 'Global challenges (separate physics only)',
    points: [
      { ref: 'P8a', title: 'Astronomy — the Solar System, stars and galaxies' },
      { ref: 'P8b', title: 'Life cycle of stars' },
      { ref: 'P8c', title: 'Space exploration and communication technologies' },
    ],
  },
]

// ── OCR Gateway GCSE Biology (J247) ──────────────────────────────────────────

const ocrGatewayGCSEBiologyTopics: SpecTopic[] = [
  {
    ref: 'B1', title: 'Cell-level systems',
    points: [
      { ref: 'B1a', title: 'Cell structures — animal, plant, bacterial and eukaryotic cells' },
      { ref: 'B1b', title: 'What do cells do? — cell activities and specialisation' },
      { ref: 'B1c', title: 'Cell division — mitosis, meiosis, stem cells' },
      { ref: 'B1d', title: 'Microscopy — magnification and resolution' },
    ],
  },
  {
    ref: 'B2', title: 'Scaling up',
    points: [
      { ref: 'B2a', title: 'Supplying the cell — diffusion, osmosis and active transport' },
      { ref: 'B2b', title: 'The circulatory system — heart, blood and blood vessels' },
      { ref: 'B2c', title: 'Breathing — gas exchange in the lungs' },
      { ref: 'B2d', title: 'Digestion — enzymes and absorption' },
    ],
  },
  {
    ref: 'B3', title: 'Organism-level systems',
    points: [
      { ref: 'B3a', title: 'Coordination and control — nervous and hormonal systems' },
      { ref: 'B3b', title: 'Homeostasis — thermoregulation, blood glucose control' },
      { ref: 'B3c', title: 'The kidney — filtration, reabsorption and dialysis' },
      { ref: 'B3d', title: 'Reproduction — hormones, IVF and contraception' },
      { ref: 'B3e', title: 'Plant hormones — auxins and tropisms' },
    ],
  },
  {
    ref: 'B4', title: 'Community-level systems',
    points: [
      { ref: 'B4a', title: 'Ecosystems — biotic and abiotic factors' },
      { ref: 'B4b', title: 'Food production — energy transfers and farming practices' },
      { ref: 'B4c', title: 'Nutrient cycles — carbon and nitrogen cycles' },
      { ref: 'B4d', title: 'Biodiversity and conservation' },
    ],
  },
  {
    ref: 'B5', title: 'Genetics and evolution',
    points: [
      { ref: 'B5a', title: 'DNA — structure, genes and the genetic code' },
      { ref: 'B5b', title: 'Inheritance — alleles, dominance, Punnett squares' },
      { ref: 'B5c', title: 'Natural selection and evolution — Darwin\'s theory' },
      { ref: 'B5d', title: 'Classification — taxonomy, phylogenetic trees' },
      { ref: 'B5e', title: 'Genetic engineering and selective breeding' },
    ],
  },
  {
    ref: 'B6', title: 'Global challenges',
    points: [
      { ref: 'B6a', title: 'Infectious diseases — bacteria, viruses, fungi and protists' },
      { ref: 'B6b', title: 'Immunity — vaccines, antibodies and antibiotics' },
      { ref: 'B6c', title: 'Photosynthesis — rate factors and the plant\'s use of glucose' },
      { ref: 'B6d', title: 'Respiration — aerobic and anaerobic' },
      { ref: 'B6e', title: 'Human impact on ecosystems and climate change' },
    ],
  },
]

// ── OCR Gateway GCSE Chemistry (J248) ────────────────────────────────────────

const ocrGatewayGCSEChemistryTopics: SpecTopic[] = [
  {
    ref: 'C1', title: 'Particles',
    points: [
      { ref: 'C1a', title: 'The particle model — solids, liquids and gases' },
      { ref: 'C1b', title: 'Atomic structure — protons, neutrons, electrons and isotopes' },
      { ref: 'C1c', title: 'Elements, compounds and mixtures — formulas and equations' },
      { ref: 'C1d', title: 'Electronic structure and the periodic table' },
    ],
  },
  {
    ref: 'C2', title: 'Elements, compounds and mixtures',
    points: [
      { ref: 'C2a', title: 'Purity and separation — filtration, distillation, chromatography' },
      { ref: 'C2b', title: 'Ionic bonding — electron transfer and properties' },
      { ref: 'C2c', title: 'Covalent bonding — molecular and giant structures' },
      { ref: 'C2d', title: 'Metallic bonding and alloys' },
      { ref: 'C2e', title: 'Nanoparticles and their properties' },
    ],
  },
  {
    ref: 'C3', title: 'Chemical reactions',
    points: [
      { ref: 'C3a', title: 'Balancing equations and conservation of mass' },
      { ref: 'C3b', title: 'Reactions with acids — neutralisation and salt preparation' },
      { ref: 'C3c', title: 'Oxidation and reduction — redox reactions' },
      { ref: 'C3d', title: 'Reactivity series and metal extraction' },
      { ref: 'C3e', title: 'Electrolysis — principles and products' },
    ],
  },
  {
    ref: 'C4', title: 'Predicting and identifying reactions and products',
    points: [
      { ref: 'C4a', title: 'Group 1, 7 and 0 — properties and trends' },
      { ref: 'C4b', title: 'Tests for ions — flame tests, precipitates' },
      { ref: 'C4c', title: 'Exothermic and endothermic reactions; energy profiles' },
      { ref: 'C4d', title: 'Bond energies — calculating energy changes' },
    ],
  },
  {
    ref: 'C5', title: 'Monitoring and controlling chemical reactions',
    points: [
      { ref: 'C5a', title: 'Rate of reaction — collision theory and factors affecting rate' },
      { ref: 'C5b', title: 'Calculations — moles, reacting masses, percentage yield and atom economy' },
      { ref: 'C5c', title: 'Reversible reactions and dynamic equilibrium' },
    ],
  },
  {
    ref: 'C6', title: 'Global challenges',
    points: [
      { ref: 'C6a', title: 'Organic chemistry — alkanes, alkenes, alcohols and cracking' },
      { ref: 'C6b', title: 'Crude oil and sustainable development' },
      { ref: 'C6c', title: 'The Earth\'s atmosphere — past, present and future' },
      { ref: 'C6d', title: 'Water — treatment and sustainability' },
      { ref: 'C6e', title: 'Life cycle assessment and using resources sustainably' },
    ],
  },
]

// ── Edexcel GCSE Biology (1BI0) ──────────────────────────────────────────────

const edexcelGCSEBiologyTopics: SpecTopic[] = [
  {
    ref: 'T1', title: 'Key concepts in biology',
    points: [
      { ref: '1.1', title: 'Plant and animal cell structures and functions' },
      { ref: '1.2', title: 'Biological molecules — carbohydrates, lipids, proteins, DNA' },
      { ref: '1.3', title: 'Enzymes — structure, activity, factors affecting rate' },
      { ref: '1.4', title: 'Transport — diffusion, osmosis and active transport' },
      { ref: '1.5', title: 'Microscopy — magnification, resolution and calculations' },
    ],
  },
  {
    ref: 'T2', title: 'Cells and control',
    points: [
      { ref: '2.1', title: 'Mitosis — stages, purpose and chromosomes' },
      { ref: '2.2', title: 'Growth and differentiation — stem cells' },
      { ref: '2.3', title: 'The nervous system — receptors, neurones, reflex arcs' },
      { ref: '2.4', title: 'Neurotransmitters and synapses' },
    ],
  },
  {
    ref: 'T3', title: 'Genetics',
    points: [
      { ref: '3.1', title: 'Meiosis — halving chromosome number for gametes' },
      { ref: '3.2', title: 'DNA structure — base pairing, the double helix' },
      { ref: '3.3', title: 'Protein synthesis — transcription and translation' },
      { ref: '3.4', title: 'Mutations — causes, types and consequences' },
      { ref: '3.5', title: 'Inheritance — alleles, genotypes, phenotypes, Punnett squares' },
      { ref: '3.6', title: 'Genetic disorders — cystic fibrosis, sickle-cell disease' },
    ],
  },
  {
    ref: 'T4', title: 'Natural selection and genetic modification',
    points: [
      { ref: '4.1', title: 'Variation — genetic, environmental and random mutation' },
      { ref: '4.2', title: 'Evolution — natural selection and evidence' },
      { ref: '4.3', title: 'Classification — Linnaeus and phylogenetic trees' },
      { ref: '4.4', title: 'Selective breeding and genetic modification (GMOs)' },
      { ref: '4.5', title: 'Cloning — natural and artificial, advantages and risks' },
    ],
  },
  {
    ref: 'T5', title: 'Health, disease and medicine',
    points: [
      { ref: '5.1', title: 'Health — physical, mental and social dimensions' },
      { ref: '5.2', title: 'Communicable diseases — bacteria, viruses, fungi, protists' },
      { ref: '5.3', title: 'STIs and spread of disease — HIV/AIDS' },
      { ref: '5.4', title: 'The immune system — phagocytes, antibodies, memory cells' },
      { ref: '5.5', title: 'Vaccines and immunisation' },
      { ref: '5.6', title: 'Medicines — development, clinical trials, antibiotics and resistance' },
      { ref: '5.7', title: 'Non-communicable diseases — cancer, cardiovascular disease' },
    ],
  },
  {
    ref: 'T6', title: 'Plant structures and their functions',
    points: [
      { ref: '6.1', title: 'Photosynthesis — equation, limiting factors and investigations' },
      { ref: '6.2', title: 'Plant tissues — xylem, phloem and meristems' },
      { ref: '6.3', title: 'Water and mineral transport — transpiration and factors affecting it' },
      { ref: '6.4', title: 'Plant hormones — auxins, gibberellins and abscisic acid' },
    ],
  },
  {
    ref: 'T7', title: 'Animal coordination, control and homeostasis',
    points: [
      { ref: '7.1', title: 'Hormones — glands, blood transport and target organs' },
      { ref: '7.2', title: 'Blood glucose control — insulin, glucagon and diabetes' },
      { ref: '7.3', title: 'Thermoregulation — vasodilation, sweating and shivering' },
      { ref: '7.4', title: 'Reproductive hormones — menstrual cycle, contraception and IVF' },
      { ref: '7.5', title: 'Excretion — the kidney, filtration, reabsorption and ADH' },
    ],
  },
  {
    ref: 'T8', title: 'Exchange and transport in animals',
    points: [
      { ref: '8.1', title: 'The circulatory system — heart structure and function' },
      { ref: '8.2', title: 'Blood — plasma, red and white blood cells, platelets' },
      { ref: '8.3', title: 'Gas exchange — alveoli structure and the lungs' },
      { ref: '8.4', title: 'Aerobic and anaerobic respiration — equations and applications' },
    ],
  },
  {
    ref: 'T9', title: 'Ecosystems and material cycles',
    points: [
      { ref: '9.1', title: 'Ecosystems — biotic and abiotic factors, carrying capacity' },
      { ref: '9.2', title: 'Biodiversity — importance and threats' },
      { ref: '9.3', title: 'Food chains and energy transfer — biomass pyramids' },
      { ref: '9.4', title: 'The carbon cycle and global warming' },
      { ref: '9.5', title: 'The nitrogen cycle — decomposers, nitrification and denitrification' },
      { ref: '9.6', title: 'Decomposition — decay rates and the role of microorganisms' },
    ],
  },
]

// ── WJEC GCSE Physics ─────────────────────────────────────────────────────────

const wjecGCSEPhysicsTopics: SpecTopic[] = [
  {
    ref: 'U1', title: 'Motion, forces and energy',
    points: [
      { ref: '1.1', title: 'Speed, velocity and acceleration — equations and graphs' },
      { ref: '1.2', title: 'Newton\'s Laws of Motion' },
      { ref: '1.3', title: 'Momentum and its conservation' },
      { ref: '1.4', title: 'Work, power and energy — W = Fs, P = W/t' },
      { ref: '1.5', title: 'Energy resources — fossil fuels, renewable and non-renewable' },
      { ref: '1.6', title: 'Thermal physics — specific heat capacity and latent heat' },
    ],
  },
  {
    ref: 'U2', title: 'Waves',
    points: [
      { ref: '2.1', title: 'Properties of waves — speed, frequency, wavelength and amplitude' },
      { ref: '2.2', title: 'Reflection, refraction and diffraction' },
      { ref: '2.3', title: 'The electromagnetic spectrum — properties and uses' },
      { ref: '2.4', title: 'Sound and ultrasound' },
      { ref: '2.5', title: 'Seismic waves and the structure of the Earth' },
    ],
  },
  {
    ref: 'U3', title: 'Electricity',
    points: [
      { ref: '3.1', title: 'Current, voltage and resistance — V = IR' },
      { ref: '3.2', title: 'Series and parallel circuits' },
      { ref: '3.3', title: 'Electrical power and energy — P = VI' },
      { ref: '3.4', title: 'Mains electricity — AC/DC, the UK plug, safety' },
      { ref: '3.5', title: 'Static electricity and electric fields' },
    ],
  },
  {
    ref: 'U4', title: 'Electromagnetism',
    points: [
      { ref: '4.1', title: 'Magnetic fields — permanent magnets and field patterns' },
      { ref: '4.2', title: 'Electromagnetic induction — Faraday\'s Law' },
      { ref: '4.3', title: 'Transformers — step-up and step-down, the National Grid' },
      { ref: '4.4', title: 'The motor effect and electric motors' },
    ],
  },
  {
    ref: 'U5', title: 'Radioactivity',
    points: [
      { ref: '5.1', title: 'Structure of the atom — protons, neutrons and electrons' },
      { ref: '5.2', title: 'Alpha, beta and gamma radiation — properties and penetration' },
      { ref: '5.3', title: 'Half-life and radioactive decay calculations' },
      { ref: '5.4', title: 'Uses and hazards of ionising radiation' },
      { ref: '5.5', title: 'Nuclear fission and fusion' },
    ],
  },
  {
    ref: 'U6', title: 'Particles and the Universe (separate physics only)',
    points: [
      { ref: '6.1', title: 'The Solar System — planets, moons and orbits' },
      { ref: '6.2', title: 'Stellar evolution — life cycle of stars' },
      { ref: '6.3', title: 'The expanding universe — red-shift and the Big Bang' },
      { ref: '6.4', title: 'The particle model revisited — gas pressure and temperature' },
    ],
  },
]

// ── WJEC GCSE Biology ─────────────────────────────────────────────────────────

const wjecGCSEBiologyTopics: SpecTopic[] = [
  {
    ref: 'B1', title: 'Cell biology and organisation',
    points: [
      { ref: 'B1.1', title: 'Animal, plant and bacterial cell structures' },
      { ref: 'B1.2', title: 'Cell specialisation and differentiation' },
      { ref: 'B1.3', title: 'Transport — diffusion, osmosis and active transport' },
      { ref: 'B1.4', title: 'Mitosis and meiosis' },
      { ref: 'B1.5', title: 'Tissues, organs and organ systems' },
    ],
  },
  {
    ref: 'B2', title: 'Biodiversity and classification',
    points: [
      { ref: 'B2.1', title: 'Classification systems — kingdoms and phylogenetic trees' },
      { ref: 'B2.2', title: 'Adaptations and natural selection' },
      { ref: 'B2.3', title: 'Biodiversity — importance, threats and conservation' },
      { ref: 'B2.4', title: 'Sampling techniques — quadrats and transects' },
    ],
  },
  {
    ref: 'B3', title: 'Genetics and evolution',
    points: [
      { ref: 'B3.1', title: 'DNA structure and the genetic code' },
      { ref: 'B3.2', title: 'Protein synthesis — transcription and translation' },
      { ref: 'B3.3', title: 'Inheritance — dominant and recessive alleles, Punnett squares' },
      { ref: 'B3.4', title: 'Variation — genetic, environmental and mutation' },
      { ref: 'B3.5', title: 'Evolution — evidence and mechanisms' },
    ],
  },
  {
    ref: 'B4', title: 'Health, disease and medicine',
    points: [
      { ref: 'B4.1', title: 'Communicable diseases — bacteria, viruses, fungi and protists' },
      { ref: 'B4.2', title: 'The immune system — phagocytosis, antibodies, vaccines' },
      { ref: 'B4.3', title: 'Non-communicable diseases — cancer, cardiovascular disease' },
      { ref: 'B4.4', title: 'Drugs — development, trials, antibiotics and resistance' },
    ],
  },
  {
    ref: 'B5', title: 'Ecosystems and environmental biology',
    points: [
      { ref: 'B5.1', title: 'Food chains, food webs and energy transfer' },
      { ref: 'B5.2', title: 'The carbon and nitrogen cycles' },
      { ref: 'B5.3', title: 'Human impact — deforestation, pollution and global warming' },
      { ref: 'B5.4', title: 'Conservation strategies and endangered species' },
    ],
  },
  {
    ref: 'B6', title: 'Homeostasis and the nervous system',
    points: [
      { ref: 'B6.1', title: 'The nervous system — CNS, peripheral nervous system, reflex arc' },
      { ref: 'B6.2', title: 'Hormones — glands, blood transport and target organs' },
      { ref: 'B6.3', title: 'Blood glucose control — insulin, glucagon, diabetes' },
      { ref: 'B6.4', title: 'Thermoregulation and water balance' },
      { ref: 'B6.5', title: 'Photosynthesis and respiration — equations and energy flow' },
    ],
  },
]

// ── WJEC GCSE Chemistry ──────────────────────────────────────────────────────

const wjecGCSEChemistryTopics: SpecTopic[] = [
  {
    ref: 'C1', title: 'Atomic structure and the periodic table',
    points: [
      { ref: 'C1.1', title: 'Structure of the atom — protons, neutrons, electrons' },
      { ref: 'C1.2', title: 'Isotopes and relative atomic mass' },
      { ref: 'C1.3', title: 'Electronic structure and the periodic table — groups and periods' },
      { ref: 'C1.4', title: 'Metals and non-metals; Group 1, 7 and 0 trends' },
    ],
  },
  {
    ref: 'C2', title: 'Chemical bonding and structure',
    points: [
      { ref: 'C2.1', title: 'Ionic bonding — electron transfer and ionic lattices' },
      { ref: 'C2.2', title: 'Covalent bonding — molecular and giant covalent structures' },
      { ref: 'C2.3', title: 'Metallic bonding — sea of electrons model' },
      { ref: 'C2.4', title: 'Properties of materials linked to bonding type' },
    ],
  },
  {
    ref: 'C3', title: 'Chemical calculations',
    points: [
      { ref: 'C3.1', title: 'Relative formula mass and conservation of mass' },
      { ref: 'C3.2', title: 'The mole — molar mass and Avogadro\'s number' },
      { ref: 'C3.3', title: 'Percentage yield and atom economy' },
      { ref: 'C3.4', title: 'Concentration — mol/dm³ calculations' },
    ],
  },
  {
    ref: 'C4', title: 'Chemical reactions',
    points: [
      { ref: 'C4.1', title: 'Rate of reaction — collision theory and factors' },
      { ref: 'C4.2', title: 'Reversible reactions and equilibrium' },
      { ref: 'C4.3', title: 'Exothermic and endothermic reactions — bond energies' },
      { ref: 'C4.4', title: 'Electrolysis — principles, products and half-equations' },
    ],
  },
  {
    ref: 'C5', title: 'Acids, bases and salts',
    points: [
      { ref: 'C5.1', title: 'Acids and alkalis — pH scale and indicators' },
      { ref: 'C5.2', title: 'Neutralisation and preparation of salts' },
      { ref: 'C5.3', title: 'Reactivity series and metal reactions with acids' },
      { ref: 'C5.4', title: 'Tests for ions — flame tests and precipitates' },
    ],
  },
  {
    ref: 'C6', title: 'Organic chemistry',
    points: [
      { ref: 'C6.1', title: 'Crude oil — fractional distillation and fractions' },
      { ref: 'C6.2', title: 'Alkanes and alkenes — naming, structures, reactions' },
      { ref: 'C6.3', title: 'Combustion and atmospheric pollution' },
      { ref: 'C6.4', title: 'Polymerisation — addition and condensation polymers' },
    ],
  },
  {
    ref: 'C7', title: 'Water and the atmosphere',
    points: [
      { ref: 'C7.1', title: 'Earth\'s early atmosphere — evolution and composition' },
      { ref: 'C7.2', title: 'The greenhouse effect and climate change' },
      { ref: 'C7.3', title: 'Potable water — treatment methods' },
      { ref: 'C7.4', title: 'Atmospheric pollutants — causes and effects' },
    ],
  },
  {
    ref: 'C8', title: 'Using and choosing materials',
    points: [
      { ref: 'C8.1', title: 'Metals — extraction, alloys and corrosion prevention' },
      { ref: 'C8.2', title: 'Life cycle assessment and recycling' },
      { ref: 'C8.3', title: 'Nanoparticles and smart materials' },
      { ref: 'C8.4', title: 'Sustainable chemistry and green principles' },
    ],
  },
]

// ── AQA A Level Physics (7408) ────────────────────────────────────────────────

const aqaALevelPhysicsTopics: SpecTopic[] = [
  {
    ref: '1', title: 'Measurements and their errors',
    points: [
      { ref: '1.1', title: 'SI units — base and derived units, prefixes' },
      { ref: '1.2', title: 'Limitations of physical measurements — systematic and random errors' },
      { ref: '1.3', title: 'Uncertainties — absolute, percentage; propagating through calculations' },
      { ref: '1.4', title: 'Significant figures, accuracy and precision' },
    ],
  },
  {
    ref: '2', title: 'Particles and radiation',
    points: [
      { ref: '2.1', title: 'Constituents of the atom — protons, neutrons, electrons' },
      { ref: '2.2', title: 'Stable and unstable nuclei — radioactive decay' },
      { ref: '2.3', title: 'Particles, antiparticles and photons' },
      { ref: '2.4', title: 'Particle interactions — four fundamental forces and exchange particles' },
      { ref: '2.5', title: 'Classification of particles — leptons, hadrons, quarks, mesons, baryons' },
      { ref: '2.6', title: 'The photoelectric effect — threshold frequency, work function, stopping potential' },
      { ref: '2.7', title: 'Wave–particle duality — de Broglie wavelength λ = h/mv' },
      { ref: '2.8', title: 'Energy levels in atoms — emission and absorption spectra' },
    ],
  },
  {
    ref: '3', title: 'Waves',
    points: [
      { ref: '3.1', title: 'Progressive waves — displacement, amplitude, wavelength, frequency, phase' },
      { ref: '3.2', title: 'Transverse and longitudinal waves; polarisation' },
      { ref: '3.3', title: 'Superposition — path difference, interference and coherence' },
      { ref: '3.4', title: 'Stationary waves — formation, nodes, antinodes and harmonics' },
      { ref: '3.5', title: 'Diffraction — single slit and diffraction gratings (nλ = d sinθ)' },
      { ref: '3.6', title: 'Refraction — Snell\'s Law, total internal reflection, critical angle' },
    ],
  },
  {
    ref: '4', title: 'Mechanics and materials',
    points: [
      { ref: '4.1', title: 'Scalars and vectors — addition, resolution into components' },
      { ref: '4.2', title: 'Moments — couples, torques and equilibrium conditions' },
      { ref: '4.3', title: 'Linear motion — suvat equations and projectile motion' },
      { ref: '4.4', title: 'Newton\'s Laws and momentum — impulse = FΔt' },
      { ref: '4.5', title: 'Work, energy and power — conservation of energy' },
      { ref: '4.6', title: 'Bulk properties of solids — stress, strain, Young modulus' },
      { ref: '4.7', title: 'The Young modulus — measuring it, stress–strain graphs' },
    ],
  },
  {
    ref: '5', title: 'Electricity',
    points: [
      { ref: '5.1', title: 'Charge, current and Kirchhoff\'s First Law' },
      { ref: '5.2', title: 'Potential difference and EMF' },
      { ref: '5.3', title: 'Resistance — Ohm\'s Law, resistivity ρ = RA/L' },
      { ref: '5.4', title: 'I–V characteristics — ohmic, filament, NTC thermistor, diode' },
      { ref: '5.5', title: 'Series and parallel circuits — Kirchhoff\'s Laws' },
      { ref: '5.6', title: 'EMF and internal resistance — ε = I(R + r)' },
      { ref: '5.7', title: 'Potential dividers — circuit calculations' },
    ],
  },
  {
    ref: '6', title: 'Further mechanics and thermal physics',
    points: [
      { ref: '6.1', title: 'Circular motion — angular velocity, centripetal acceleration and force' },
      { ref: '6.2', title: 'Simple harmonic motion — a = −ω²x; energy in SHM' },
      { ref: '6.3', title: 'Resonance and damping' },
      { ref: '6.4', title: 'Thermal energy transfer — conduction, convection, radiation' },
      { ref: '6.5', title: 'Specific heat capacity and specific latent heat' },
      { ref: '6.6', title: 'Ideal gas law — pV = nRT; gas laws' },
      { ref: '6.7', title: 'Kinetic theory — mean kinetic energy = 3/2 kT' },
    ],
  },
  {
    ref: '7', title: 'Fields and their consequences',
    points: [
      { ref: '7.1', title: 'Gravitational fields — g = GM/r²; gravitational potential' },
      { ref: '7.2', title: 'Orbits — Kepler\'s Third Law T² ∝ r³; escape velocity' },
      { ref: '7.3', title: 'Electric fields — E = F/Q = V/d; Coulomb\'s Law' },
      { ref: '7.4', title: 'Capacitance — C = Q/V; energy stored = ½CV²; charging and discharging' },
      { ref: '7.5', title: 'Magnetic fields — flux density, force on a wire F = BIL' },
      { ref: '7.6', title: 'Electromagnetic induction — Faraday\'s and Lenz\'s Laws' },
      { ref: '7.7', title: 'Transformers and alternating current — RMS values' },
    ],
  },
  {
    ref: '8', title: 'Nuclear physics',
    points: [
      { ref: '8.1', title: 'Rutherford scattering and nuclear radius' },
      { ref: '8.2', title: 'Radioactive decay — activity, decay constant A = λN' },
      { ref: '8.3', title: 'Half-life calculations — N = N₀e^(−λt)' },
      { ref: '8.4', title: 'Binding energy and mass defect — E = mc²' },
      { ref: '8.5', title: 'Nuclear fission — chain reaction and reactor design' },
      { ref: '8.6', title: 'Nuclear fusion — conditions and energy release' },
    ],
  },
  {
    ref: '9', title: 'Astrophysics (option)',
    points: [
      { ref: '9.1', title: 'Telescopes — refracting, reflecting, radio and space-based' },
      { ref: '9.2', title: 'Classification of stars — luminosity, temperature, HR diagram' },
      { ref: '9.3', title: 'Stellar evolution — from nebula to white dwarf, neutron star or black hole' },
      { ref: '9.4', title: 'Cosmology — Hubble\'s Law, redshift and the Big Bang' },
      { ref: '9.5', title: 'Dark matter and dark energy — evidence and implications' },
    ],
  },
]

// ── OCR A Level Physics A (H557) ─────────────────────────────────────────────

const ocrALevelPhysicsTopics: SpecTopic[] = [
  {
    ref: 'M1', title: 'Development of practical skills',
    points: [
      { ref: 'M1.1', title: 'Planning experiments — variables, control, hypothesis' },
      { ref: 'M1.2', title: 'Implementing — measurements, apparatus and techniques' },
      { ref: 'M1.3', title: 'Analysis — processing data, graphs and uncertainties' },
      { ref: 'M1.4', title: 'Evaluation — reliability, validity and improvements' },
    ],
  },
  {
    ref: 'M2', title: 'Foundations of physics',
    points: [
      { ref: 'M2.1', title: 'Physical quantities and units — SI base units' },
      { ref: 'M2.2', title: 'Scalars and vectors — components and resultants' },
      { ref: 'M2.3', title: 'Significant figures, orders of magnitude and estimation' },
    ],
  },
  {
    ref: 'M3', title: 'Forces and motion',
    points: [
      { ref: 'M3.1', title: 'Motion — displacement, velocity, acceleration; suvat equations' },
      { ref: 'M3.2', title: 'Forces in action — equilibrium, moments and free-body diagrams' },
      { ref: 'M3.3', title: 'Work, energy and power — conservation of energy' },
      { ref: 'M3.4', title: 'Materials — stress, strain, Young modulus, elastic energy' },
      { ref: 'M3.5', title: 'Newton\'s Laws, momentum and impulse' },
      { ref: 'M3.6', title: 'Circular motion — centripetal force and angular velocity' },
      { ref: 'M3.7', title: 'Oscillations — SHM, energy and resonance' },
    ],
  },
  {
    ref: 'M4', title: 'Electrons, waves and photons',
    points: [
      { ref: 'M4.1', title: 'Charge, current and Kirchhoff\'s Laws' },
      { ref: 'M4.2', title: 'Energy, power and resistance — Ohm\'s Law, resistivity' },
      { ref: 'M4.3', title: 'Series and parallel circuits — potential dividers' },
      { ref: 'M4.4', title: 'Waves — wave equation, superposition, stationary waves' },
      { ref: 'M4.5', title: 'Quantum behaviour — photons, the photoelectric effect, E = hf' },
      { ref: 'M4.6', title: 'Wave–particle duality — electron diffraction and de Broglie' },
      { ref: 'M4.7', title: 'The electromagnetic spectrum — properties and applications' },
    ],
  },
  {
    ref: 'M5', title: 'The Newtonian world and astrophysics',
    points: [
      { ref: 'M5.1', title: 'Thermal physics — kinetic model, gas laws, ideal gas equation' },
      { ref: 'M5.2', title: 'Gravitational fields — field strength, potential, orbits' },
      { ref: 'M5.3', title: 'Stars and stellar evolution — HR diagram, star types' },
      { ref: 'M5.4', title: 'Cosmology — Hubble\'s Law, CMB and the Big Bang' },
    ],
  },
  {
    ref: 'M6', title: 'Particles and medical physics',
    points: [
      { ref: 'M6.1', title: 'Capacitors — charge, energy, exponential decay' },
      { ref: 'M6.2', title: 'Electric fields — Coulomb\'s Law, field lines, potential' },
      { ref: 'M6.3', title: 'Magnetic fields — force on a wire and a charge, induction' },
      { ref: 'M6.4', title: 'Nuclear and particle physics — quark model, radioactive decay' },
      { ref: 'M6.5', title: 'Medical imaging — X-rays, PET scans, ultrasound' },
    ],
  },
]

// ── WJEC A Level Physics ──────────────────────────────────────────────────────

const wjecALevelPhysicsTopics: SpecTopic[] = [
  {
    ref: 'U1', title: 'Motion, energy and matter',
    points: [
      { ref: '1.1', title: 'Basic physics — SI units, scalars, vectors, uncertainties' },
      { ref: '1.2', title: 'Kinematics — equations of motion, displacement–time and velocity–time graphs' },
      { ref: '1.3', title: 'Dynamics — Newton\'s Laws, momentum, impulse' },
      { ref: '1.4', title: 'Energy concepts — work, power, efficiency, conservation of energy' },
      { ref: '1.5', title: 'Circular motion — angular velocity, centripetal force' },
      { ref: '1.6', title: 'Vibrations — SHM, resonance and damping' },
      { ref: '1.7', title: 'Solids under stress — Hooke\'s Law, Young modulus, stress–strain graphs' },
      { ref: '1.8', title: 'Using radiation to investigate stars — Wien\'s Law, Stefan\'s Law' },
    ],
  },
  {
    ref: 'U2', title: 'Electricity and light',
    points: [
      { ref: '2.1', title: 'Conduction of electricity — charge carriers, drift velocity' },
      { ref: '2.2', title: 'Resistance — Ohm\'s Law, resistivity, I–V characteristics' },
      { ref: '2.3', title: 'D.C. circuits — Kirchhoff\'s Laws, EMF and internal resistance' },
      { ref: '2.4', title: 'The nature of waves — transverse, longitudinal, wave equation' },
      { ref: '2.5', title: 'Wave properties — superposition, interference, diffraction, polarisation' },
      { ref: '2.6', title: 'Refraction of light — Snell\'s Law, total internal reflection' },
      { ref: '2.7', title: 'Photons — E = hf, photoelectric effect, work function' },
      { ref: '2.8', title: 'Lasers — stimulated emission, population inversion' },
    ],
  },
  {
    ref: 'U3', title: 'Oscillations and nuclei',
    points: [
      { ref: '3.1', title: 'Capacitance — C = Q/V, energy stored, charge/discharge' },
      { ref: '3.2', title: 'Electrostatic and gravitational fields — field strength and potential' },
      { ref: '3.3', title: 'Orbits and the wider universe — Kepler\'s Third Law, escape velocity' },
      { ref: '3.4', title: 'Magnetic fields — force on a wire, F = BIL, electromagnetic induction' },
      { ref: '3.5', title: 'Nuclear decay — alpha, beta, gamma; activity; half-life' },
      { ref: '3.6', title: 'Nuclear energy — binding energy, fission and fusion' },
    ],
  },
  {
    ref: 'U4', title: 'Fields and options',
    points: [
      { ref: '4.1', title: 'Alternating currents — peak and RMS values, transformers' },
      { ref: '4.2', title: 'Particles and nuclear structure — quarks, leptons, standard model' },
      { ref: '4.3', title: 'Optional topic: Medical physics' },
      { ref: '4.4', title: 'Optional topic: Energy and the environment' },
      { ref: '4.5', title: 'Optional topic: Astrophysics and cosmology' },
    ],
  },
]

// ── Exported qualifications ───────────────────────────────────────────────────

export const QUALIFICATIONS: Qualification[] = [
  // ── Edexcel ──
  { id: 'edexcel-gcse-physics',   label: 'Edexcel GCSE Physics (9-1)',   shortLabel: 'GCSE Physics',   topics: gcsePhysicsTopics },
  { id: 'edexcel-gcse-biology',   label: 'Edexcel GCSE Biology (1BI0)',   shortLabel: 'GCSE Biology',   topics: edexcelGCSEBiologyTopics },
  { id: 'edexcel-gcse-chemistry', label: 'Edexcel GCSE Chemistry (1CH0)', shortLabel: 'GCSE Chemistry', topics: edexcelGCSEChemTopics },
  { id: 'edexcel-alevel-physics', label: 'Edexcel A Level Physics (9PH0)', shortLabel: 'A Level Physics', topics: aLevelPhysicsTopics },
  // ── AQA ──
  { id: 'aqa-gcse-physics',       label: 'AQA GCSE Physics (8463)',       shortLabel: 'GCSE Physics',   topics: aqaGCSEPhysicsTopics },
  { id: 'aqa-gcse-biology',       label: 'AQA GCSE Biology (8461)',       shortLabel: 'GCSE Biology',   topics: aqaGCSEBiologyTopics },
  { id: 'aqa-gcse-chemistry',     label: 'AQA GCSE Chemistry (8462)',     shortLabel: 'GCSE Chemistry', topics: aqaGCSEChemistryTopics },
  { id: 'aqa-alevel-physics',     label: 'AQA A Level Physics (7408)',    shortLabel: 'A Level Physics', topics: aqaALevelPhysicsTopics },
  // ── OCR Gateway ──
  { id: 'ocr-gateway-gcse-physics',   label: 'OCR Gateway GCSE Physics (J249)',   shortLabel: 'GCSE Physics',   topics: ocrGatewayGCSEPhysicsTopics },
  { id: 'ocr-gateway-gcse-biology',   label: 'OCR Gateway GCSE Biology (J247)',   shortLabel: 'GCSE Biology',   topics: ocrGatewayGCSEBiologyTopics },
  { id: 'ocr-gateway-gcse-chemistry', label: 'OCR Gateway GCSE Chemistry (J248)', shortLabel: 'GCSE Chemistry', topics: ocrGatewayGCSEChemistryTopics },
  { id: 'ocr-alevel-physics',         label: 'OCR A Level Physics A (H557)',      shortLabel: 'A Level Physics', topics: ocrALevelPhysicsTopics },
  // ── WJEC ──
  { id: 'wjec-gcse-physics',   label: 'WJEC GCSE Physics',   shortLabel: 'GCSE Physics',   topics: wjecGCSEPhysicsTopics },
  { id: 'wjec-gcse-biology',   label: 'WJEC GCSE Biology',   shortLabel: 'GCSE Biology',   topics: wjecGCSEBiologyTopics },
  { id: 'wjec-gcse-chemistry', label: 'WJEC GCSE Chemistry', shortLabel: 'GCSE Chemistry', topics: wjecGCSEChemistryTopics },
  { id: 'wjec-alevel-physics', label: 'WJEC A Level Physics', shortLabel: 'A Level Physics', topics: wjecALevelPhysicsTopics },
  // ── Pearson Exploring Science International (KS3) ──
  { id: 'exploring-science-y7', label: 'Pearson Exploring Science Year 7', shortLabel: 'Exp. Sci Y7', topics: exploringScience7Topics },
  { id: 'exploring-science-y8', label: 'Pearson Exploring Science Year 8', shortLabel: 'Exp. Sci Y8', topics: exploringScience8Topics },
  { id: 'exploring-science-y9', label: 'Pearson Exploring Science Year 9', shortLabel: 'Exp. Sci Y9', topics: exploringScience9Topics },
  // ── IB Diploma ──
  { id: 'ib-physics',   label: 'IB Diploma Physics',   shortLabel: 'IB Physics',   topics: ibPhysicsTopics },
  { id: 'ib-chemistry', label: 'IB Diploma Chemistry', shortLabel: 'IB Chemistry', topics: ibChemistryTopics },
  { id: 'ib-biology',   label: 'IB Diploma Biology',   shortLabel: 'IB Biology',   topics: ibBiologyTopics },
]

export function getQualification(id: string): Qualification | undefined {
  return QUALIFICATIONS.find(q => q.id === id)
}

export function getAllPoints(qualId: string): Array<{ topic: SpecTopic; point: SpecPoint }> {
  const q = getQualification(qualId)
  if (!q) return []
  return q.topics.flatMap(topic => topic.points.map(point => ({ topic, point })))
}
