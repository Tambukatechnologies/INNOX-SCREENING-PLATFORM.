/**
 * TAMBUKA IDENTITYGUARD v2.6 - Core Structural Engine
 * Architecture: Multi-Tenant Client-Side Memory Isolation & Simulated Biometric Layer
 */

// ==========================================
// 1. GLOBAL SYSTEM STRUCTURAL DATA CONTEXTS
// ==========================================
const DOMAIN_DATA_MATRIX = {
    "Rukiga Region Node": {
        token: "RUKIGA_POOL_26",
        schools: ["Rukiga High School", "St. Paul's Secondary School", "Muhanga Technical Institute", "Kashambya Seed School"]
    },
    "Kampala Central Hub": {
        token: "KAMPALA_HUB_26",
        schools: ["Kampala College", "City High School", "Makerere Modern SS", "Kololo Senior Secondary"]
    }
};

// System Memory Repositories (State Hydration Arrays)
let activeTenantNode = null; 
let registeredLocalRoster = []; 
let centralUplinkFederationLedger = []; 

// Transient Hardware Memory Buffers
let temporaryAvatarDataURL = "";
let temporaryBiometricPrintHash = "";

// Mock Database Initial Seeding Data
const MOCK_SEED_DATA = [
    {
        id: "PL-0941",
        name: "Brian Tumwine",
        district: "Rukiga Region Node",
        school: "Rukiga High School",
        dob: "2011-04-12",
        division: "Under-15",
        tier: "Tier-1 (Elite)",
        matches: ["Starter", "Starter", "Substitute", "Starter"],
        printHash: "7f83a21b9c4eef01",
        avatar: "👤",
        status: "VERIFIED",
        timestamp: "2026-06-04 14:22"
    },
    {
        id: "PL-1104",
        name: "Sarah Namubiru",
        district: "Kampala Central Hub",
        school: "City High School",
        dob: "2008-11-23",
        division: "Under-19",
        tier: "Tier-1 (Elite)",
        matches: ["Starter", "Starter", "Starter", "Starter"],
        printHash: "a4c2d910fe835b62",
        avatar: "👤",
        status: "PENDING",
        timestamp: "2026-06-04 16:05"
    }
];

// Initialize System on Script Parse Execution
document.addEventListener("DOMContentLoaded", () => {
    seedMasterSystemMemory();
    populateDistrictSelectors();
});

function seedMasterSystemMemory() {
    centralUplinkFederationLedger = [...MOCK_SEED_DATA];
}

// ==========================================
// 2. MULTI-TENANT GATEWAY ACCESS CONTROLLER
// ==========================================
function executeTenantHandshake() {
    const secretKeyInput = document.getElementById("tenantSecretKey").value.trim();
    let verifiedNodeKey = null;

    for (const [nodeName, nodeConfig] of Object.entries(DOMAIN_DATA_MATRIX)) {
        if (nodeConfig.token === secretKeyInput) {
            verifiedNodeKey = nodeName;
            break;
        }
    }

    if (verifiedNodeKey) {
        activeTenantNode = verifiedNodeKey;
        
        // Render View Interfaces
        document.getElementById("adminAuthGateway").style.display = "none";
        document.getElementById("masterOperationsBase").style.display = "block";
        document.getElementById("identityBannerContext").textContent = `Active Channel Isolation: ${activeTenantNode} [SECURE]`;
        
        // Synchronize and filter scoped dataset entries
        synchronizeLocalTenantRoster();
        handleEnrollmentDistrictChange();
        renderLocalLedgerGrid();
        repopulateScreeningSelectors();
    } else {
        alert("CRITICAL SECURITY NOTICE: Invalid Dynamic Regional Cryptographic Allocation Token Entry.");
    }
}

// ==========================================
// 3. NAVIGATION VIEWPORT MATRIX CONTROLLER
// ==========================================
function navigateViews(targetPanelId, triggerButton) {
    // Collect all panel containers and enforce standard display suppression
    const views = document.querySelectorAll(".view-panel");
    views.forEach(v => v.classList.remove("active-view"));

    // Enforce Active Panel Selection Routing Target
    const targetedView = document.getElementById(targetPanelId);
    if (targetedView) {
        targetedView.classList.add("active-view");
    }

    // Toggle Dynamic Tab Button Styling States
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(btn => btn.classList.remove("active-tab"));
    triggerButton.classList.add("active-tab");

    // Dynamic Context Render Lifecycles on Navigation Intercepts
    if (targetPanelId === 'adminControlView') {
        renderLocalLedgerGrid();
    } else if (targetPanelId === 'matchDayScreeningView') {
        repopulateScreeningSelectors();
        runLiveScreeningAnalysis();
    } else if (targetPanelId === 'supervisorOversightView') {
        populateCentralFilterDropdowns();
        renderCentralFederationTable();
    }
}

// ==========================================
// 4. REGISTRATION SELECTORS & BIOMETRIC CAPTURE
// ==========================================
function populateDistrictSelectors() {
    const districtSelect = document.getElementById("pDistrictSelect");
    districtSelect.innerHTML = "";

    Object.keys(DOMAIN_DATA_MATRIX).forEach(district => {
        const option = document.createElement("option");
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
    });
}

function handleEnrollmentDistrictChange() {
    const selectedDistrict = document.getElementById("pDistrictSelect").value;
    const schoolSelect = document.getElementById("pSchoolSelect");
    schoolSelect.innerHTML = "";

    if (DOMAIN_DATA_MATRIX[selectedDistrict]) {
        DOMAIN_DATA_MATRIX[selectedDistrict].schools.forEach(school => {
            const option = document.createElement("option");
            option.value = school;
            option.textContent = school;
            schoolSelect.appendChild(option);
        });
    }
}

function autoTrackDivision() {
    const dobInput = document.getElementById("pDOB").value;
    const divisionSelect = document.getElementById("pDivision");
    const mirrorDivision = document.getElementById("mirrorDivision");

    if (!dobInput) return;

    // Structural Age Matrix Calculation Processing Logic Base
    const birthDate = new Date(dobInput);
    const currentDate = new Date("2026-06-04"); // System Anchor Baseline
    let calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        calculatedAge--;
    }

    // Enforce Structural Grouping Assignments Bracket Boundaries
    let targetedGroup = "Under-19";
    if (calculatedAge < 15) {
        targetedGroup = "Under-15";
    } else if (calculatedAge < 17) {
        targetedGroup = "Under-17";
    }

    divisionSelect.value = targetedGroup;
    mirrorDivision.textContent = `${targetedGroup.toUpperCase()} BRACKET GROUP`;
}

function processLocalAvatarBuffer(fileInputElement) {
    const file = fileInputElement.files[0];
    const hashMirror = document.getElementById("mirrorHash");
    const previewBox = document.getElementById("avatarPreviewBox");

    if (file) {
        // Mock cryptographic anchor string generation representation
        const pseudorandomHash = "SHA256-" + Math.random().toString(36).substring(2, 10).toUpperCase() + Math.random().toString(36).substring(2, 10).toUpperCase();
        hashMirror.textContent = pseudorandomHash;

        const reader = new FileReader();
        reader.onload = function (e) {
            temporaryAvatarDataURL = e.target.result;
            previewBox.innerHTML = `<img src="${temporaryAvatarDataURL}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
}

function triggerRegistrationFingerprintScan() {
    const icon = document.getElementById("regPrintStatusIcon");
    const text = document.getElementById("regPrintStatusText");
    const hash = document.getElementById("regPrintHashDisplay");

    text.textContent = "Processing Hardware Scan Matrix...";
    icon.textContent = "🔄";

    setTimeout(() => {
        temporaryBiometricPrintHash = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
        icon.textContent = "🧬";
        text.textContent = "Fingerprint Captured Successfully";
        hash.textContent = `Anchor Template: ${temporaryBiometricPrintHash.toUpperCase()}`;
    }, 1200);
}

// ==========================================
// 5. DATA INGESTION & LOCAL REPO MANAGEMENT
// ==========================================
function registerBallerToMemory() {
    const name = document.getElementById("pName").value.trim();
    const district = document.getElementById("pDistrictSelect").value;
    const school = document.getElementById("pSchoolSelect").value;
    const dob = document.getElementById("pDOB").value;
    const division = document.getElementById("pDivision").value;
    const tier = document.getElementById("pTier").value;
    
    const matches = [
        document.getElementById("pMatch1").value,
        document.getElementById("pMatch2").value,
        document.getElementById("pMatch3").value,
        document.getElementById("pMatch4").value
    ];

    if (!temporaryBiometricPrintHash) {
        alert("DATA ENTRY EXCEPTION: You must secure initial biometric hardware enrollment capture before record submission can be structurally committed.");
        return;
    }

    const uniqueProfileUID = "PL-" + Math.floor(1000 + Math.random() * 9000);
    const systemTimestamp = "2026-06-04 " + new Date().toTimeString().substring(0, 5);

    const packedAthleteStructureNode = {
        id: uniqueProfileUID,
        name: name,
        district: district,
        school: school,
        dob: dob,
        division: division,
        tier: tier,
        matches: matches,
        printHash: temporaryBiometricPrintHash,
        avatar: temporaryAvatarDataURL || "👤",
        status: "PENDING", // Initial Status State Assignment Block
        timestamp: systemTimestamp
    };

    // Inject directly into central data ledger
    centralUplinkFederationLedger.push(packedAthleteStructureNode);
    
    // Refresh local client instances isolation view sets
    synchronizeLocalTenantRoster();
    renderLocalLedgerGrid();
    
    // Clear registration controls workflow contexts
    document.getElementById("playerEnrollmentForm").reset();
    document.getElementById("mirrorName").textContent = "Awaiting Input";
    document.getElementById("mirrorHash").textContent = "No File Seeded";
    document.getElementById("avatarPreviewBox").innerHTML = "<span>👤</span>";
    document.getElementById("regPrintStatusIcon").textContent = "🛑";
    document.getElementById("regPrintStatusText").textContent = "Fingerprint Signature Missing";
    document.getElementById("regPrintHashDisplay").textContent = "Awaiting master capture sequence...";
    temporaryAvatarDataURL = "";
    temporaryBiometricPrintHash = "";

    alert(`SUCCESS: Profile ${uniqueProfileUID} committed safely to local volatile tenant instance ledger keyspace.`);
}

function synchronizeLocalTenantRoster() {
    if (!activeTenantNode) return;
    registeredLocalRoster = centralUplinkFederationLedger.filter(baller => baller.district === activeTenantNode);
}

function renderLocalLedgerGrid() {
    const ledgerContainer = document.getElementById("adminMasterRosterDisplay");
    const filterSchool = document.getElementById("localSchoolFilter").value;
    const countBadge = document.getElementById("localCountBadge");

    // Populate Filter Configuration Controls Context Matrices dynamically
    const localSchoolFilterSelect = document.getElementById("localSchoolFilter");
    if (localSchoolFilterSelect.children.length <= 0 && activeTenantNode) {
        localSchoolFilterSelect.innerHTML = '<option value="ALL">-- Display All Institutional Desks --</option>';
        DOMAIN_DATA_MATRIX[activeTenantNode].schools.forEach(school => {
            const opt = document.createElement("option");
            opt.value = school;
            opt.textContent = school;
            localSchoolFilterSelect.appendChild(opt);
        });
    }

    ledgerContainer.innerHTML = "";
    
    // Filter records against active tenant context state scope constraints
    let filteredRecords = registeredLocalRoster;
    if (filterSchool && filterSchool !== "ALL") {
        filteredRecords = registeredLocalRoster.filter(p => p.school === filterSchool);
    }

    countBadge.textContent = `Records Total: ${filteredRecords.length}`;

    if (filteredRecords.length === 0) {
        ledgerContainer.innerHTML = `<p style="color: var(--text-dimmed); grid-column: 1/-1; text-align: center; padding: 20px;">No isolated structural nodes matched parameters within this active channel domain view.</p>`;
        return;
    }

    filteredRecords.forEach(player => {
        const card = document.createElement("div");
        card.className = "player-identity-card";
        
        let photoMarkup = player.avatar.startsWith("data:") 
            ? `<img src="${player.avatar}" alt="Photo">` 
            : `<span>${player.avatar}</span>`;

        let statusClass = "status-pending";
        if (player.status === "VERIFIED") statusClass = "status-verified";
        if (player.status === "FLAGGED") statusClass = "status-flagged";

        let lineupBadges = player.matches.map((m, idx) => `<span class="lineup-inline-badge">M${idx+1}: ${m[0]}</span>`).join("");

        card.innerHTML = `
            <div class="player-card-photo">${photoMarkup}</div>
            <div class="player-card-details">
                <h4>${player.name} <span class="tier-badge">${player.id}</span></h4>
                <p class="table-school-tag">${player.school}</p>
                <p>DOB: ${player.dob} — <strong>${player.division}</strong></p>
                <p style="font-size:0.75rem; font-family:monospace; color:#38bdf8; margin-top:2px;">FP: ${player.printHash.toUpperCase().substring(0,8)}...</p>
                <div style="margin-top: 5px; margin-bottom: 5px;">${lineupBadges}</div>
                <span class="status-pill ${statusClass}">${player.status}</span>
            </div>
        `;
        ledgerContainer.appendChild(card);
    });
}

function uplinkRosterToCentralAdmin() {
    alert("TRANSMISSION SUCCESS: Aggregated records and asymmetric physical state properties piped to central operations database cloud ledger structures.");
}

// ==========================================
// 6. FIELD TERMINAL MATCH-DAY SCREENING RADAR ENGINE
// ==========================================
function repopulateScreeningSelectors() {
    const selector = document.getElementById("screeningTargetSelector");
    selector.innerHTML = "";

    if (registeredLocalRoster.length === 0) {
        const opt = document.createElement("option");
        opt.textContent = "-- No Isolated Domain Records Present Loaded — Register Athletes First --";
        selector.appendChild(opt);
        return;
    }

    registeredLocalRoster.forEach(baller => {
        const opt = document.createElement("option");
        opt.value = baller.id;
        opt.textContent = `${baller.name} (${baller.id}) - ${baller.school}`;
        selector.appendChild(opt);
    });
}

function runLiveScreeningAnalysis() {
    const targetId = document.getElementById("screeningTargetSelector").value;
    const logConsole = document.getElementById("radarConsoleLog");
    
    // Reset hardware scanners interface configurations
    document.getElementById("fingerScannerBox").classList.remove("disabled");
    document.getElementById("biometricPrintIcon").textContent = "🛑";
    document.getElementById("biometricStatusText").textContent = "Fingerprint Scanner Active — Click to Scan";
    
    document.getElementById("faceScannerBox").classList.add("disabled");
    document.getElementById("biometricFaceIcon").textContent = "📷";
    document.getElementById("biometricFaceText").textContent = "Face Scan Fallback [Locked]";

    const activeBallerNode = registeredLocalRoster.find(p => p.id === targetId);

    if (!activeBallerNode) {
        logConsole.textContent = "No profile actively loaded into scanning terminal matrix fields.";
        return;
    }

    logConsole.innerHTML = `
[SYSTEM INITIALIZATION COMPLETED]
[PROFILE RESOLUTION ADDR]: FETCHING INSTANCE NODE ${activeBallerNode.id}
---------------------------------------------
NAME      : ${activeBallerNode.name.toUpperCase()}
DOB       : ${activeBallerNode.dob}
DIVISION  : ${activeBallerNode.division}
CLASS TIER: ${activeBallerNode.tier}
INSTITUTE : ${activeBallerNode.school}
MATCH MAP : M1[${activeBallerNode.matches[0]}], M2[${activeBallerNode.matches[1]}], M3[${activeBallerNode.matches[2]}], M4[${activeBallerNode.matches[3]}]
ANCHOR FP : ${activeBallerNode.printHash.toUpperCase()}
STATUS    : CURRENT STATE IN LEDGER VALUE => ${activeBallerNode.status}
---------------------------------------------
[AWAITING LIVE HARDWARE STREAM DATA CAPTURE INPUTS]...
`;
}

function triggerHardwareFingerprintScan() {
    const targetId = document.getElementById("screeningTargetSelector").value;
    const activeBallerNode = registeredLocalRoster.find(p => p.id === targetId);
    if (!activeBallerNode) return;

    const printIcon = document.getElementById("biometricPrintIcon");
    const printText = document.getElementById("biometricStatusText");
    const logConsole = document.getElementById("radarConsoleLog");

    printIcon.classList.add("scanning");
    printIcon.textContent = "🔄";
    printText.textContent = "Reading Live Biometric Topology Dermal Mapping...";
    logConsole.innerHTML += `\n[HARDWARE EVENT]: Initializing digital touch processing terminal scanner pipeline array...`;

    setTimeout(() => {
        printIcon.classList.remove("scanning");
        
        // Simulated structural analysis testing configuration matrices logic
        // 15% random failure calculation engine scenario mapping model
        const bypassRoll = Math.random() > 0.15;
        
        if (bypassRoll) {
            printIcon.textContent = "✅";
            printText.textContent = "Biometric Match Confirmed!";
            logConsole.innerHTML += `
\n[ANALYSIS RESULT]: SCAN VERIFICATION PASSED
[LEDGER VERDICT]: Live scan string matched anchor template context registry successfully.
[SECURITY ENGINE STATUS]: PASS CLEAR STANDARD.
`;
        } else {
            printIcon.textContent = "❌";
            printText.textContent = "MISMATCH DETECTED / FAULTY READ";
            document.getElementById("faceScannerBox").classList.remove("disabled");
            document.getElementById("biometricFaceText").textContent = "Face Scan Fallback Required — Click Image Terminal";
            
            logConsole.innerHTML += `
\n[CRITICAL WARNING]: BIOMETRIC IDENTIFICATION CONFLICT DETECTED
[ERROR INFRASTRUCTURE]: Calculated signature does not equate structural anchor hash.
[ROUTING EXCEPTION HANDLER]: Initializing Optical Neural Face Scan Fallback Protocol Block.
`;
        }
    }, 1500);
}

function triggerHardwareFaceFallbackScan() {
    const box = document.getElementById("faceScannerBox");
    if (box.classList.contains("disabled")) return;

    const faceIcon = document.getElementById("biometricFaceIcon");
    const faceText = document.getElementById("biometricFaceText");
    const logConsole = document.getElementById("radarConsoleLog");

    faceIcon.classList.add("scanning");
    faceIcon.textContent = "🔄";
    faceText.textContent = "Analyzing Geometric Point Maps Spatial Coordinates...";

    setTimeout(() => {
        faceIcon.classList.remove("scanning");
        faceIcon.textContent = "🤖";
        faceText.textContent = "Spatial Face Matching Matrix Complete";
        
        logConsole.innerHTML += `
\n[FALLBACK ENGINE EVENT]: Optical face match structural data calculations finalized.
[VERDICT]: Verification identity photo landmarks align with live terminal capture mapping.
[CONCLUSION]: Target profile parameters confirmed manually via secondary infrastructure channel.
`;
    }, 1500);
}

function executeScreeningVerdict(verdictDecisionString) {
    const targetId = document.getElementById("screeningTargetSelector").value;
    const activeBallerNode = centralUplinkFederationLedger.find(p => p.id === targetId);

    if (!activeBallerNode) {
        alert("SELECTION CONFLICT: No validation target loaded into memory workspace.");
        return;
    }

    activeBallerNode.status = verdictDecisionString;
    
    // Synchronize arrays
    synchronizeLocalTenantRoster();
    runLiveScreeningAnalysis();
    
    alert(`VERDICT STATE RECORDED: Node identity ${targetId} updated to state designation -> ${verdictDecisionString}`);
}

// ==========================================
// 7. CENTRAL OVERSIGHT FEDERATION MATRIX CONTROLLER
// ==========================================
function unlockSupervisorOversightFeed() {
    const inputKey = document.getElementById("supervisorKeyInput").value;
    
    if (inputKey === "SUPERVISOR_OMNIPRESENT_2026") {
        document.getElementById("supervisorLockContainer").style.display = "none";
        document.getElementById("centralBoardContent").style.display = "block";
        populateCentralFilterDropdowns();
        renderCentralFederationTable();
    } else {
        alert("AUTHENTICATION BREACH: Access clearance credentials metrics rejection. Security incident flagged.");
    }
}

function populateCentralFilterDropdowns() {
    const districtFilter = document.getElementById("centralDistrictFilter");
    const schoolFilter = document.getElementById("centralSchoolFilter");

    // Populate Districts Dropdown if empty
    if (districtFilter.children.length <= 0) {
        districtFilter.innerHTML = '<option value="ALL">-- Across Global Cross-District Nodes Stream --</option>';
        Object.keys(DOMAIN_DATA_MATRIX).forEach(d => {
            const opt = document.createElement("option");
            opt.value = d;
            opt.textContent = d;
            districtFilter.appendChild(opt);
        });
    }

    // Handle cascading chain activation constraints architecture context
    handleCentralDistrictFilterChange();
}

function handleCentralDistrictFilterChange() {
    const targetDistrict = document.getElementById("centralDistrictFilter").value;
    const schoolFilter = document.getElementById("centralSchoolFilter");
    
    schoolFilter.innerHTML = '<option value="ALL">-- Display All Institutional Desks Globally --</option>';

    if (targetDistrict === "ALL") {
        Object.keys(DOMAIN_DATA_MATRIX).forEach(d => {
            DOMAIN_DATA_MATRIX[d].schools.forEach(s => {
                const opt = document.createElement("option");
                opt.value = s;
                opt.textContent = `${s} (${d.substring(0,6)})`;
                schoolFilter.appendChild(opt);
            });
        });
    } else {
        DOMAIN_DATA_MATRIX[targetDistrict].schools.forEach(s => {
            const opt = document.createElement("option");
            opt.value = s;
            opt.textContent = s;
            schoolFilter.appendChild(opt);
        });
    }
    renderCentralFederationTable();
}

function renderCentralFederationTable() {
    const tableBody = document.querySelector("#centralFederationAdminFeed tbody") || document.createElement("tbody");
    if (!document.querySelector("#centralFederationAdminFeed tbody")) {
        document.getElementById("centralFederationAdminFeed").appendChild(tableBody);
    }

    const dFilter = document.getElementById("centralDistrictFilter").value;
    const sFilter = document.getElementById("centralSchoolFilter").value;

    tableBody.innerHTML = "";

    // Global Dataset Cross-Filtering Evaluation Loop Block
    let finalDataset = centralUplinkFederationLedger;

    if (dFilter !== "ALL") {
        finalDataset = finalDataset.filter(p => p.district === dFilter);
    }
    if (sFilter !== "ALL") {
        finalDataset = finalDataset.filter(p => p.school === sFilter);
    }

    if (finalDataset.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--text-dimmed); padding:30px;">Global network database stream returned zero record nodes under active constraint metrics filters.</td></tr>`;
        return;
    }

    finalDataset.forEach(player => {
        const row = document.createElement("tr");

        let imgMarkup = player.avatar.startsWith("data:") 
            ? `<img src="${player.avatar}" alt="Avatar">` 
            : `<span>${player.avatar}</span>`;

        let pillClass = "status-pending";
        if (player.status === "VERIFIED") pillClass = "status-verified";
        if (player.status === "FLAGGED") pillClass = "status-flagged";

        row.innerHTML = `
            <td>
                <div class="table-player-cell">
                    <div class="table-player-avatar">${imgMarkup}</div>
                    <div>
                        <span style="font-weight:bold; color:#fff;">${player.name}</span>
                        <span class="table-district-badge">ID Reference Vector: <code>${player.id}</code></span>
                    </div>
                </div>
            </td>
            <td>
                <span class="table-school-tag">${player.school}</span>
            </td>
            <td>
                <span style="color:var(--neon-blue);">${player.district}</span>
                <span class="table-district-badge">Classification Segment: ${player.tier}</span>
            </td>
            <td>
                <span>${player.dob}</span>
                <strong style="display:block; font-size:0.75rem; color:var(--text-dimmed);">${player.division.toUpperCase()}</strong>
            </td>
            <td>
                <span class="status-pill ${pillClass}">${player.status}</span>
            </td>
            <td>
                <span class="table-timestamp">${player.timestamp}</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
