/* ============================================================
   Pi PAO Practice — Application Logic
   app.js
   ============================================================ */
(function() {

                "use strict";

                // Safe localStorage wrapper — mobile file:// / content:// may block it
                const _storage = (() => {
                    let mem = {};
                    try {
                        localStorage.setItem("_test", "1");
                        localStorage.removeItem("_test");
                        return localStorage;
                    } catch (e) {
                        console.warn(
                            "localStorage unavailable, using in-memory storage",
                        );
                        return {
                            getItem: (k) => mem[k] ?? null,
                            setItem: (k, v) => {
                                mem[k] = v;
                            },
                            removeItem: (k) => {
                                delete mem[k];
                            },
                        };
                    }
                })();

                const PI_DIGITS =
                    "141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882353787593751957781857780532171226806613001927876611195909216420198938095257201065485863278865936153381827968230301952035301852968995773622599413891249721775283479131515574857242454150695950829533116861727855889075098381754637464939319255060400927701671139009848824012858361603563707660104710181942955596198946767837449448255379774726847104047534646208046684259069491293313677028989152104752162056966024058038150193511253382430035587640247496473263914199272604269922796782354781636009341721641219924586315030286182974555706749838505494588586926995690927210797509302955321165344987202755960236480665499119881834797753566369807426542527862551818417574672890977772793800081647060016145249192173217214772350141441973568548161361157352552133475741849468438523323907394143334547762416862518983569485562099219222184272550254256887671790494601653466804988627232791786085784383827967976681454100953883786360950680064225125205117392984896084128488626945604241965285022210661186306744278622039194945047123713786960956364371917287467764657573962413890865832645995813390478027590099465764078951269468398352595709825822620522489407726719478268482601476990902640136394437455305068203496252451749399651431429809190659250937221696461515709858387410597885959772975498930161753928468138268683868942774155991855925245953959431049972524680845987273644695848653836736222626099124608051243884390451244136549762780797715691435997700129616089441694868555848406353422072225828488648158456028506016842739452267467678895252138522549954666727823986456596116354886230577456498035593634568174324112515076069479451096596094025228879710893145669136867228748940560101503308617928680920874760917824938589009714909675985261365549781893129784821682998948722658804857564014270477555132379641451523746234364542858444795265867821051141354735739523113427166102135969536231442952484937187110145765403590279934403742007310578539062198387447808478489683321445713868751943506430218453191048481005370614680674919278191197939952061419663428754440643745123718192179998391015919561814675142691239748940907186494231961567945208095146550225231603881930142093762137855956638937787083039069792077346722182562599661501421503068038447734549202605414665925201497442850732518666002132434088190710486331734649651453905796268561005508106658796998163574736384052571459102897064140110971206280439039759515677157700420337869936007230558763176359421873125147120532928191826186125867321579198414848829164470609575270695722091756711672291098169091528017350671274858322287183520935396572512108357915136988209144421006751033467110314126711136990865851639831501970165151168517143765761835155650884909989859982387345528331635507647918535893226185489632132933089857064204675259070915481416549859461637180270981994309924488957571282890592323326097299712084433573265489382391193259746366730583604142813883032038249037589852437441702913276561809377344403070746921120191302033038019762110110044929321516084244485963766983895228684783123552658213144957685726243344189303968642624341077322697802807318915441101044682325271620105265227211166039666557309254711055785376346682065310989652691862056476931257058635662018558100729360659876486117910453348850346113657686753249441668039626579787718556084552965412665408530614344431858676975145661406800700237877659134401712749470420562230538994561314071127000407854733269939081454664645880797270826683063432858785698305235808933065757406795457163775254202114955761581400250126228594130216471550979259230990796547376125517656751357517829666454779174501129961489030463994713296210734043751895735961458901938971311179042978285647503203198691514028708085990480109412147221317947647772622414254854540332157185306142288137585043063321751829798662237172159160771669254748738986654949450114654062843366393790039769265672146385306736096571209180763832716641627488880078692560290228472104031721186082041900042296617119637792133757511495950156604963186294726547364252308177036751590673502350728354056704038674351362222477158915049530984448933309634087807693259939780541934144737744184263129860809988868741326047215695162396586457302163159819319516735381297416772947867242292465436680098067692823828068996400482435403701416314965897940924323789690706977942236250822168895738379862300159377647165122893578601588161755782973523344604281512627203734314653197777416031990665541876397929334419521541341899485444734567383162499341913181480927777103863877343177207545654532207770921201905166096280490926360197598828161332316663652861932668633606273567630354477628035045077723554710585954870279081435624014517180624643626794561275318134078330336254232783944975382437205835311477119926063813346776879695970309833913077109870408591337464144282277263465947047458784778720192771528073176790770715721344473060570073349243693113835049316312840425121925651798069411352801314701304781643788518529092854520116583934196562134914341595625865865570552690496520985803385072242648293972858478316305777756068887644624824685792603953527734803048029005876075825104747091643961362676044925627420420832085661190625454337213153595845068772460290161876679524061634252257719542916299193064553779914037340432875262888963995879475729174642635745525407909145135711136941091193932519107602082520261879853188770584297259167781314969900901921169717372784768472686084900337702424291651300500516832336435038951702989392233451722013812806965011784408745196012122859937162313017114448464090389064495444006198690754851602632750529834918740786680881833851022833450850486082503930213321971551843063545500766828294930413776552793975175461395398468339363830474611996653858153842056853386218672523340283087112328278921250771262946322956398989893582116745627010218356462201349671518819097303811980049734072396103685406643193950979019069963955245300545058068550195673022921913933918568034490398205955100226353536192041994745538593810234395544959778377902374216172711172364343543947822181852862408514006660443325888569867054315470696574745855033232334210730154594051655379068662733379958511562578432298827372319898757141595781119635833005940873068121602876496286744604774649159950549737425626901049037781986835938146574126804925648798556145372347867330390468838343634655379498641927056387293174872332083760112302991136793862708943879936201629515413371424892830722012690147546684765357616477379467520049075715552781965362132392640616013635815590742202020318727760527721900556148425551879253034351398442532234157623361064250639049750086562710953591946589751413103482276930624743536325691607815478181152843667957061108615331504452127473924544945423682886061340841486377670096120715124914043027253860764823634143346235189757664521641376796903149501910857598442391986291642193994907236234646844117394032659184044378051333894525742399508296591228508555821572503107125701266830240292952522011872676756220415420516184163484756516999811614101002996078386909291603028840026910414079288621507842451670908700069928212066041837180653556725253256753286129104248776182582976515795984703562226293486003415872298053498965022629174878820273420922224533985626476691490556284250391275771028402799806636582548892648802545661017296702664076559042909945681506526530537182941270336931378517860904070866711496558343434769338578171138645587367812301458768712660348913909562009939361031029161615288138437909904231747336394804575931493140529763475748119356709110137751721008031559024853090669203767192203322909433467685142214477379393751703443661991040337511173547191855046449026365512816228824462575916333039107225383742182140883508657391771509682887478265699599574490661758344137522397096834080053559849175417381883999446974867626551658276584835884531427756879002909517028352971634456212964043523117600665101241200659755851276178583829204197484423608007193045761893234922927965019875187212726750798125547095890455635792122103334669749923563025494780249011419521238281530911407907386025152274299581807247162591668545133312394804947079119153267343028244186041426363954800044800267049624820179289647669758318327131425170296923488962766844032326092752496035799646925650493681836090032380929345958897069536534940603402166544375589004563288225054525564056448246515187547119621844396582533754388569094113031509526179378002974120766514793942590298969594699556576121865619673378623625612521632086286922210327488921865436480229678070576561514463204692790682120738837781423356282360896320806822246801224826117718589638140918390367367222088832151375560037279839400415297002878307667094447456013455641725437090697939612257142989467154357846878861444581231459357198492252847160504922124247014121478057345510500801908699603302763478708108175450119307141223390866393833952942578690507643100638351983438934159613185434754649556978103829309716465143840700707360411237359984345225161050702705623526601276484830840761183013052793205427462865403603674532865105706587488225698157936789766974220575059683440869735020141020672358502007245225632651341055924019027421624843914035998953539459094407046912091409387001264560016237428802109276457931065792295524988727584610126483699989225695968815920560010165525637568";

                const DEFAULT_BG_COLOR = "#667eea";
                const DEFAULT_CORRECT_COLOR = "#4ade80";
                const DEFAULT_INCORRECT_COLOR = "#f87171";
                const DEFAULT_ACCENT_COLOR = "#3584E4";
                const MAX_IMAGE_SIZE_BYTES = 32 * 1024 * 1024;

                // State
                let currentPAOMode = "222";
                let paoDataSource = "textarea";
                let personList = {},
                    actionList = {},
                    objectList = {};
                let excelPersonList = {},
                    excelActionList = {},
                    excelObjectList = {};
                let excelColumnConfig = {
                    numCol: "E",
                    person3Col: "F",
                    action2Col: "G",
                    object3Col: "H",
                    person2Col: "L",
                    object2Col: "M",
                };
                let currentBackgroundColor = DEFAULT_BG_COLOR;
                let correctColor = DEFAULT_CORRECT_COLOR,
                    incorrectColor = DEFAULT_INCORRECT_COLOR;
                let accentColor = DEFAULT_ACCENT_COLOR;
                let isInputLocked = false,
                    lockOnIncorrect = true,
                    darkMode = false;
                let sequenceStartIndex = 0,
                    currentInputLength = 0;
                let hintHotkey = "W",
                    revealHotkey = "N",
                    imgHotkey = "I",
                    browseHotkey = "B",
                    statsHotkey = "S",
                    everestHotkey = "E",
                    mistakeHotkey = "A",
                    hardHotkey = "H",
                    listHotkey = "L",
                    reviewHotkey = "R",
                    helperTime = 1500;
                let dayOffsetHours = 4; // hours after midnight that count as "next day"
                let srsRawMode = false; // hide position/image in reviews when true
                let autoMistake = false; // automatically add mistyped chunks to SRS as Again
                // Track the current chunk being typed: for mistake (M) and auto-good
                let currentTypingChunkPos = -1; // 0-based start of the chunk the user is in
                let currentChunkMistakePressed = false; // true if M was pressed for this chunk
                let currentChunkLastRating = 0; // 0=none, 1=Again, 4=Hard
                // Undo/Redo stacks for manual/auto mistakes added outside the SRS modal
                let mistakeUndoStack = []; // [{ pos, oldCard }]
                let mistakeRedoStack = []; // [{ pos, newCard }]

                // Undo/Redo stacks for ratings made inside the Browse modal
                // (1-4 shortcuts). Separate from the A/H hotkey stacks so
                // ratings in the two contexts don't interfere with each other.
                let browseRateHistory = []; // [{ pos, oldCard, isDue, rating }]
                let browseRateRedo = []; // [{ pos, newCard, isDue, rating }]

                // ── Goal bar settings ──
                let goalBarUpdate = "digit"; // "digit" | "group" | "chunk"
                let goalBarPosition = "top"; // "top" | "bottom"
                let goalBarHidden = false;
                let heatmapViewYear = new Date().getFullYear();
                let heatmapMode = "both"; // "digits", "cards", or "both"
                let piCoverageMode = "due"; // "due" or "ease"
                let heatmapScheme = "ice"; // "ice" | "magenta"

                // Heatmap/picoverage colour schemes (light → dark).
                // Empty-cell color is mode-aware (#EAEAEA light / #222222 dark) and set in CSS.
                const HEATMAP_SCHEMES = {
                    ice: { light: "#95C8F3", dark: "#0063DE", overdue: "#003280" },
                    magenta: {
                        light: "#ffb8d9",
                        dark: "#5c2657",
                        overdue: "#3a0050",
                    },
                };

                // Module-scope color interpolator used by both the heatmap and pi-coverage.
                function pcLerpColor(a, b, t) {
                    const ar = parseInt(a.slice(1, 3), 16), ag = parseInt(a.slice(3, 5), 16), ab = parseInt(a.slice(5, 7), 16);
                    const br = parseInt(b.slice(1, 3), 16), bg = parseInt(b.slice(3, 5), 16), bb = parseInt(b.slice(5, 7), 16);
                    const rr = Math.round(ar + (br - ar) * t);
                    const rg = Math.round(ag + (bg - ag) * t);
                    const rb = Math.round(ab + (bb - ab) * t);
                    return `rgb(${rr},${rg},${rb})`;
                }

                // True when the app is running from disk or a local dev server
                // (file://, localhost, 127.0.0.1, 192.168/10/172.x private ranges).
                // On GitHub Pages this is false, which is how we hide the
                // "Media folder path" setting — that path can never resolve on Pages.
                function _isLocalDev() {
                    const h = location.hostname;
                    if (!h || h === "localhost" || h === "127.0.0.1" || h === "0.0.0.0")
                        return true;
                    if (h.startsWith("192.168.") || h.startsWith("10.")) return true;
                    if (/^172\.(1[6-9]|2[0-9]|3[01])\./.test(h)) return true;
                    return false;
                }

                // Update the "Load media" label + folder-button visibility so
                // it only promises what the current browser can deliver.
                function _updateLoadMediaLabel() {
                    const folderSupported = "showDirectoryPicker" in window;
                    const label = document.getElementById("loadMediaLabel");
                    if (label)
                        label.textContent = "Load media:";
                    // Also hide the folder button if the API is missing.
                    const fb = document.getElementById("loadMediaFolderBtn");
                    if (fb) fb.style.display = folderSupported ? "" : "none";
                }

                // Reflect the current paoRangeMode in the settings UI:
                //   "222"   → 2-2-2 covers all pi digits (no range inputs shown)
                //   "323"   → 3-2-3 covers all pi digits (no range inputs shown)
                //   "both"  → 2-2-2 covers 1..crossover, 3-2-3 covers
                //             crossover+1..PI_DIGITS.length (single input)
                // crossover is 0-based, so the 2-2-2 chunk index is
                // rangeCrossover (i.e. 2-2-2 ends at index crossover-1).
                function _applyPaoRangeMode() {
                    const rBoth = document.getElementById("paoRangeBothRow");
                    const msg = document.getElementById("paoRangeLockedMsg");
                    if (rBoth) rBoth.style.display = "";
                    if (msg) {
                        msg.style.display = "none";
                        msg.textContent = "";
                    }
                    if (paoRangeMode === "222") {
                        range222Start = 1;
                        range222End = PI_DIGITS.length;
                        range323Start = PI_DIGITS.length + 1;
                        range323End = PI_DIGITS.length + 1;
                        if (rBoth) rBoth.style.display = "none";
                        if (msg) {
                            msg.textContent = "2-2-2 mode active. Covers all pi digits in this app.";
                            msg.style.display = "";
                        }
                    } else if (paoRangeMode === "323") {
                        range222Start = PI_DIGITS.length + 1;
                        range222End = PI_DIGITS.length + 1;
                        range323Start = 1;
                        range323End = PI_DIGITS.length;
                        if (rBoth) rBoth.style.display = "none";
                        if (msg) {
                            msg.textContent = "3-2-3 mode active. Covers all pi digits in this app.";
                            msg.style.display = "";
                        }
                    } else {
                        // "both" — derive the four range vars from the crossover
                        range222Start = 1;
                        range222End = rangeCrossover;
                        range323Start = rangeCrossover + 1;
                        range323End = PI_DIGITS.length;
                    }
                    // Mirror the crossover value into its input (if visible)
                    const crossEl = document.getElementById("rangeCrossover");
                    if (crossEl) crossEl.value = rangeCrossover;
                }

                // ── PAO textarea validation ──
                // Person + Object can have BOTH 2-digit keys (00-99, used
                // by 2-2-2 mode) and 3-digit keys (000-999, used by 3-2-3
                // mode) in the same map. The Excel sample has the same
                // value under both key lengths (one column per length), so
                // we must validate them independently — a 2-digit key is
                // not "unexpected" just because the map also has 3-digit
                // keys (and vice versa). Action is always 2-digit (shared
                // between the two modes).
                //
                // Only the key lengths that are actually present in the
                // map are checked. If the map has only 2-digit keys, we
                // check 00-99 and skip 000-999.
                //
                // Returns:
                //   {
                //     person2:  { ok, missing[], extra[], blankTerms[] } | null
                //     person3:  { ok, missing[], extra[], blankTerms[] } | null
                //     action:   { ok, missing[], extra[], blankTerms[] }
                //     object2:  { ok, missing[], extra[], blankTerms[] } | null
                //     object3:  { ok, missing[], extra[], blankTerms[] } | null
                //     has2, has3: <bool>
                //   }
                function _validatePaoLists(p, a, o) {
                    const allKeys = (m) => Object.keys(m || {});
                    const keysByLen = (m, len) =>
                        allKeys(m).filter((k) => k.length === len);

                    const pHas2 = keysByLen(p, 2).length > 0;
                    const pHas3 = keysByLen(p, 3).length > 0;
                    const oHas2 = keysByLen(o, 2).length > 0;
                    const oHas3 = keysByLen(o, 3).length > 0;
                    const aHas2 = keysByLen(a, 2).length > 0;

                    const req2 = Array.from({ length: 100 }, (_, i) =>
                        String(i).padStart(2, "0"),
                    );
                    const req3 = Array.from({ length: 1000 }, (_, i) =>
                        String(i).padStart(3, "0"),
                    );

                    const validate = (map, required, keyLen) => {
                        // Only consider keys of the matching length —
                        // the map can hold BOTH 2-digit and 3-digit keys
                        // (for 2-2-2 and 3-2-3 modes respectively) and we
                        // must not flag the wrong-length keys as "extra".
                        const present = allKeys(map).filter(
                            (k) => k.length === keyLen,
                        );
                        const presentSet = new Set(present);
                        const missing = required.filter(
                            (k) => !presentSet.has(k),
                        );
                        const extra = present.filter(
                            (k) => !required.includes(k),
                        );
                        const blankTerms = present.filter(
                            (k) => !String(map[k] || "").trim(),
                        );
                        return {
                            ok:
                                missing.length === 0 &&
                                extra.length === 0 &&
                                blankTerms.length === 0,
                            missing,
                            extra,
                            blankTerms,
                        };
                    };
                    // If a set isn't present in the map, return null so
                    // _updatePaoValidationSummary knows to skip it.
                    const ok = (cond, map, req, keyLen) =>
                        cond ? validate(map, req, keyLen) : null;

                    return {
                        person2: ok(pHas2, p, req2, 2),
                        person3: ok(pHas3, p, req3, 3),
                        // Return null (pristine) when action is empty — returning
                        // { ok: true } caused a false blue border on fresh install.
                        action: aHas2 ? validate(a, req2, 2) : null,
                        object2: ok(oHas2, o, req2, 2),
                        object3: ok(oHas3, o, req3, 3),
                        has2: pHas2 || oHas2 || aHas2,
                        has3: pHas3 || oHas3,
                    };
                }

                // Apply the red/blue border to an installer or settings
                // textarea given one or more validation results. The
                // border is green only if every present set is valid; if
                // any present set is invalid, the border is red. The
                // per-textarea status line is no longer used — the
                // consolidated summary (rendered by
                // _updatePaoValidationSummary) replaces it.
                //   one or more { ok, missing, ... } | null results
                function _applyPaoValidationUi(textareaEl, ...results) {
                    if (!textareaEl) return;
                    textareaEl.style.border = "";
                    // No results (no key lengths present) → neutral border
                    if (results.length === 0) return;
                    // Pristine (untouched) — every result is null
                    if (results.every((r) => r === null)) return;
                    // Some result is non-null; consider it valid only if
                    // every non-null result is ok
                    const ok = results
                        .filter((r) => r !== null)
                        .every((r) => r.ok);
                    textareaEl.style.border = ok
                        ? "1.5px solid var(--accent, #3584E4)"
                        : "1.5px solid #f87171";
                }

                // Build a human-readable list of issues for the consolidated
                // summary shown below the three Person/Action/Object textareas.
                // Returns an array of strings (one per box that has a problem).
                function _paoIssuesFor(result, label, required) {
                    if (!result || result.ok) return [];
                    const bits = [];
                    if (result.missing && result.missing.length) {
                        const sample = result.missing
                            .slice(0, 8)
                            .map((k) => `\`${k}\``)
                            .join(", ");
                        const more =
                            result.missing.length > 8
                                ? ` (+${result.missing.length - 8} more)`
                                : "";
                        bits.push(
                            `${label} textarea doesn't have terms ${required} — missing ${result.missing.length} key${
                                result.missing.length === 1 ? "" : "s"
                            }: ${sample}${more}`,
                        );
                    }
                    if (result.extra && result.extra.length) {
                        const sample = result.extra
                            .slice(0, 8)
                            .map((k) => `\`${k}\``)
                            .join(", ");
                        bits.push(
                            `${label} textarea has ${result.extra.length} unexpected key${
                                result.extra.length === 1 ? "" : "s"
                            }: ${sample}`,
                        );
                    }
                    if (result.blankTerms && result.blankTerms.length) {
                        bits.push(
                            `${label} textarea has ${result.blankTerms.length} blank term${
                                result.blankTerms.length === 1 ? "" : "s"
                            }`,
                        );
                    }
                    return bits;
                }

                // Render the consolidated validation summary into the given
                // summary element. The Person/Object maps can have
                // independent 2-digit and 3-digit sets; each present
                // set is checked and reported separately.
                function _updatePaoValidationSummary(summaryEl, r) {
                    if (!summaryEl) return;
                    const issues = [
                        ..._paoIssuesFor(r.person2, "Person (2-digit)", "00-99"),
                        ..._paoIssuesFor(r.person3, "Person (3-digit)", "000-999"),
                        ..._paoIssuesFor(r.action, "Action", "00-99"),
                        ..._paoIssuesFor(r.object2, "Object (2-digit)", "00-99"),
                        ..._paoIssuesFor(r.object3, "Object (3-digit)", "000-999"),
                    ];
                    if (issues.length === 0) {
                        summaryEl.textContent = "";
                        summaryEl.style.display = "none";
                        return;
                    }
                    summaryEl.innerHTML = issues
                        .map(
                            (line) =>
                                `<div style="margin:2px 0">• ${line}</div>`,
                        )
                        .join("");
                    // Use an explicit non-empty value — assigning ""
                    // removes the inline style and the CSS class
                    // (.inst-validation-summary { display: none })
                    // would re-hide the element.
                    summaryEl.style.display = "block";
                }

                // Validate the Settings page's Person/Action/Object textareas
                // and apply the border + status message styling.
                function _updateSettingsPaoValidation() {
                    const r = _validatePaoLists(
                        personList,
                        actionList,
                        objectList,
                    );
                    _applyPaoValidationUi(
                        document.getElementById("personList"),
                        r.person2,
                        r.person3,
                    );
                    _applyPaoValidationUi(
                        document.getElementById("actionList"),
                        r.action,
                    );
                    _applyPaoValidationUi(
                        document.getElementById("objectList"),
                        r.object2,
                        r.object3,
                    );
                    _updatePaoValidationSummary(
                        document.getElementById(
                            "paoTextareaValidationSummary",
                        ),
                        r,
                    );
                }

                // Same idea for the installer's textareas (IDs differ).
                // Called from the radio change handler and after an Excel
                // upload so the green/red borders reflect the current state.
                function _updateInstallerPaoValidation() {
                    const r = _validatePaoLists(
                        personList,
                        actionList,
                        objectList,
                    );
                    _applyPaoValidationUi(
                        document.getElementById("instPersonList"),
                        r.person2,
                        r.person3,
                    );
                    _applyPaoValidationUi(
                        document.getElementById("instActionList"),
                        r.action,
                    );
                    _applyPaoValidationUi(
                        document.getElementById("instObjectList"),
                        r.object2,
                        r.object3,
                    );
                    _updatePaoValidationSummary(
                        document.getElementById(
                            "instPaoTextareaValidationSummary",
                        ),
                        r,
                    );
                }

                // Push the current state of the PAO maps into the
                // installer's three textareas. Called after an Excel
                // upload so the user sees the parsed data when they
                // switch to the Textarea option.
                function _syncInstallerTextareasFromMaps() {
                    const tPerson = document.getElementById("instPersonList");
                    const tAction = document.getElementById("instActionList");
                    const tObject = document.getElementById("instObjectList");
                    // Use the in-memory `personList` / etc. — those are
                    // updated by saveSettings (textarea path) OR by the
                    // Excel handler (excel*List maps). We copy the
                    // excel maps into the regular maps first so both
                    // sources are reflected.
                    if (tPerson) tPerson.value = formatPaoList(personList);
                    if (tAction) tAction.value = formatPaoList(actionList);
                    if (tObject) tObject.value = formatPaoList(objectList);
                }

                // Push the Excel maps (excelPersonList etc.) into the
                // installer's three textareas, and copy them into the
                // live personList/actionList/objectList so validation
                // runs against the same data the user sees.
                function _syncInstallerTextareasFromExcel() {
                    personList = { ...excelPersonList };
                    actionList = { ...excelActionList };
                    objectList = { ...excelObjectList };
                    _syncInstallerTextareasFromMaps();
                }

                // ── Daily Goal / Stats ──
                let dailyGoal = 400;
                let dailyStats = {}; // { "2026-06-21": correctDigitCount }
                let dailyReviewStats = {}; // { "2026-06-21": reviewCount } — updated on each srsRate call
                let posTypedDates = {}; // { chunkStartPos: "YYYY-MM-DD" } — last date a chunk was completed
                let dailyCreditedSeqStart = -1;
                let dailyCreditedMaxLength = 0;
                let dailyCreditedAmount = 0; // how much of today's total came from the current seq start
                let dailyCreditedDate = ""; // tracks which day the credit state is for

                // ── Firebase Sync ──────────────────────────────────────
                let _fbApp = null,
                    _fbDb = null,
                    _fbSyncCode = null;
                const _FB_STORAGE_KEY = "piPaoFirebaseConfig";
                const _FB_CODE_KEY = "piPaoSyncCode";

                function _fbGetSyncableData() {
                    // Exclude only customBackgroundImage (potentially >1MB, stored separately)
                    const s = JSON.parse(
                        _storage.getItem("piPaoSettings") || "{}",
                    );
                    delete s.customBackgroundImage;
                    delete s.mediaFolderName;
                    return s;
                }

                function _fbStatus(msg, color) {
                    const primary = document.getElementById("firebaseStatus");
                    const extras = document.querySelectorAll(".js-firebase-status");
                    const all = primary ? [primary, ...Array.from(extras).filter(e => e !== primary)] : Array.from(extras);
                    all.forEach(el => {
                        el.textContent = msg;
                        el.style.color = color || "#888";
                    });
                }

                function _fbUpdateLastSync() {
                    const el = document.getElementById("syncLastTime");
                    if (el)
                        el.textContent =
                            "Last sync: " + new Date().toLocaleTimeString();
                }

                async function _fbPush() {
                    if (!_fbDb || !_fbSyncCode) return;
                    try {
                        const data = _fbGetSyncableData();
                        data._syncedAt = Date.now();
                        await _fbDb
                            .collection("piPao")
                            .doc(_fbSyncCode)
                            .set(data);

                        // Background image: separate doc (may be large)
                        const bg = _storage.getItem("customBackgroundImage");
                        if (bg) {
                            const bgBytes = new Blob([bg]).size;
                            if (bgBytes < 950000) {
                                // ~950KB base64 safe under 1MB Firestore limit
                                await _fbDb
                                    .collection("piPaoBg")
                                    .doc(_fbSyncCode)
                                    .set({ bg, _syncedAt: Date.now() });
                            } else {
                                console.warn(
                                    "Background image too large to sync (" +
                                        Math.round(bgBytes / 1024) +
                                        "KB), skipping.",
                                );
                            }
                        }

                        _fbUpdateLastSync();

                        _fbStatus("✓ Pushed to cloud", "#52a852");
                    } catch (e) {
                        console.error("Sync push error:", e);
                        _fbStatus("Push failed: " + e.message, "#e05252");
                    }
                }

                async function _fbPull() {
                    if (!_fbDb || !_fbSyncCode) return;
                    try {
                        const [doc, bgDoc] = await Promise.all([
                            _fbDb.collection("piPao").doc(_fbSyncCode).get(),
                            _fbDb.collection("piPaoBg").doc(_fbSyncCode).get(),
                        ]);
                        if (!doc.exists) {
                            _fbStatus("No cloud data yet", "#888");
                            return;
                        }
                        const remote = doc.data();
                        delete remote._syncedAt;
                        // Smart merge: remote wins for most fields, but intelligently
                        // combine srsData and per-day stats to avoid data loss.
                        const local = JSON.parse(
                            _storage.getItem("piPaoSettings") || "{}",
                        );
                        const merged = { ...local, ...remote };

                        // srsData: for each card position take the one with more reviews;
                        // on a tie keep the one with the later dueDate (more progressed).
                        const localSrs = local.srsData || {};
                        const remoteSrs = remote.srsData || {};
                        const mergedSrs = { ...localSrs };
                        for (const [pos, rc] of Object.entries(remoteSrs)) {
                            const lc = localSrs[pos];
                            if (!lc) {
                                mergedSrs[pos] = rc;
                            } else if (
                                rc.reviews > lc.reviews ||
                                (rc.reviews === lc.reviews &&
                                    rc.dueDate > lc.dueDate)
                            ) {
                                mergedSrs[pos] = rc;
                            }
                        }
                        merged.srsData = mergedSrs;

                        // dailyStats: take max per day so no digits get lost
                        const localDStats = local.dailyStats || {};
                        const remoteDStats = remote.dailyStats || {};
                        const mergedDStats = { ...localDStats };
                        for (const [date, cnt] of Object.entries(
                            remoteDStats,
                        )) {
                            mergedDStats[date] = Math.max(
                                mergedDStats[date] || 0,
                                cnt,
                            );
                        }
                        merged.dailyStats = mergedDStats;

                        // dailyReviewStats: sum per day (both devices may have reviewed)
                        const localRStats = local.dailyReviewStats || {};
                        const remoteRStats = remote.dailyReviewStats || {};
                        const mergedRStats = { ...localRStats };
                        for (const [date, cnt] of Object.entries(
                            remoteRStats,
                        )) {
                            mergedRStats[date] = Math.max(
                                mergedRStats[date] || 0,
                                cnt,
                            );
                        }
                        merged.dailyReviewStats = mergedRStats;

                        // posTypedDates: keep the most recent date for each position
                        const localPTD = local.posTypedDates || {};
                        const remotePTD = remote.posTypedDates || {};
                        const mergedPTD = { ...localPTD };
                        for (const [pos, date] of Object.entries(remotePTD)) {
                            if (!mergedPTD[pos] || date > mergedPTD[pos]) {
                                mergedPTD[pos] = date;
                            }
                        }
                        merged.posTypedDates = mergedPTD;

                        // If remote has ankiImages use those; otherwise keep local
                        if (
                            !merged.ankiImages ||
                            !Object.keys(merged.ankiImages).length
                        )
                            merged.ankiImages = local.ankiImages || {};
                        if (
                            !merged.ankiImages2 ||
                            !Object.keys(merged.ankiImages2).length
                        )
                            merged.ankiImages2 = local.ankiImages2 || {};
                        _storage.setItem(
                            "piPaoSettings",
                            JSON.stringify(merged),
                        );

                        // Restore background image
                        if (bgDoc.exists && bgDoc.data().bg) {
                            _storage.setItem(
                                "customBackgroundImage",
                                bgDoc.data().bg,
                            );
                        }

                        loadSettings();
                        _fbUpdateLastSync();
                        _fbStatus("✓ Pulled from cloud", "#52a852");
                    } catch (e) {
                        console.error("Sync pull error:", e);
                        _fbStatus("Pull failed: " + e.message, "#e05252");
                    }
                }

                // Debounced auto-push: saves to Firestore 2s after any saveSettings call
                let _fbPushTimer = null;
                function _fbSchedulePush() {
                    if (!_fbDb || !_fbSyncCode) return;
                    clearTimeout(_fbPushTimer);
                    _fbPushTimer = setTimeout(_fbPush, 2000);
                }

                function _fbGenerateCode() {
                    // 8-char alphanumeric code
                    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
                    return Array.from(
                        { length: 8 },
                        () => chars[Math.floor(Math.random() * chars.length)],
                    ).join("");
                }

                function _fbConnect(configStr) {
                    try {
                        // Clean the snippet: remove variable declarations and trailing semicolons
                        let cleanStr = configStr
                            .replace(/(?:const|let|var)\s+\w+\s*=\s*/, "")
                            .replace(/;$/, "")
                            .trim();
                        // Automatically wrap unquoted keys in double quotes
                        cleanStr = cleanStr.replace(
                            /([{,]\s*)([a-zA-Z0-9_]+)\s*:/g,
                            '$1"$2":',
                        );

                        const cfg = JSON.parse(cleanStr);
                        if (!cfg.apiKey || !cfg.projectId)
                            throw new Error("Missing apiKey or projectId");
                        // Delete existing app if any
                        if (_fbApp) {
                            try {
                                _fbApp.delete();
                            } catch (e) {}
                        }
                        _fbApp = firebase.initializeApp(
                            cfg,
                            "piPao_" + Date.now(),
                        );
                        _fbDb = firebase.firestore(_fbApp);
                        // Use projectId as the shared doc key — same config = same project = auto-sync
                        _fbSyncCode = cfg.projectId;
                        _storage.setItem(_FB_STORAGE_KEY, configStr.trim());
                        _fbStatus("✓ Connected", "#52a852");
                        document.getElementById(
                            "firebaseSyncSection",
                        ).style.display = "block";
                        // Enable Done button on the cloud sync step
                        if (typeof _installerUpdateNextButton === "function")
                            _installerUpdateNextButton();
                        // Auto-pull on connect
                        _fbPull();
                        return true;
                    } catch (e) {
                        console.error("Firebase connect error:", e);
                        _fbStatus("Error: " + e.message, "#e05252");
                        return false;
                    }
                }

                function _fbInit() {
                    const savedConfig = _storage.getItem(_FB_STORAGE_KEY);
                    if (savedConfig) {
                        const configInput = document.getElementById(
                            "firebaseConfigInput",
                        );
                        if (configInput) configInput.value = savedConfig;
                        _fbConnect(savedConfig);
                    }
                }
                // ─────────────────────────────────────────────────────
                let volume = 0.5,
                    useCustomBg = false,
                    currentScale = "major",
                    currentWaveform = "sine";
                let audioContext,
                    activeHelperTimer = null;
                // srsData[pos] = { interval, easeFactor, dueDate (ISO string), reviews, lapses }
                let srsData = {};
                let practiceIndex = 0;
                let isReviewMode = false; // browse modal: force-rate-before-advance mode

                // Anki image state
                // ankiImages[numStr]  = { personSrc, objectSrc }  — Millennium PAO (3-digit keys)
                // ankiImages2[numStr] = { personSrc, objectSrc }  — Century PAO (2-digit keys)
                let ankiImages = {};
                let ankiImages2 = {};
                let ankiMediaPath = "media"; // legacy fallback
                let mediaFileMap = {}; // filename → object URL (populated by folder picker)
                let mediaFolderName = ""; // display name

                // Test Mode state
                let testMode = false;
                let testShowTimer = true;
                let testTimerInterval = null;
                let testTimerSeconds = 0;
                let testTimerRunning = false;
                let testStartPos = 0; // sequenceStartIndex when test started
                let testSubmitted = false;

                // PAO range config. The 2-2-2 and 3-2-3 ranges are derived
                // from a single crossover point + the current mode:
                //   "222"   → 2-2-2 covers all pi digits
                //   "323"   → 3-2-3 covers all pi digits
                //   "both"  → 2-2-2 covers 1..crossover,
                //             3-2-3 covers crossover+1..PI_DIGITS.length
                // The four range222* / range323* vars are kept (and
                // persisted) for backwards compat with the pi-coverage
                // rendering and any saved settings from earlier versions.
                let rangeCrossover = 1000; // 0-based: 2-2-2 ends at index crossover-1
                let range222Start = 1;
                let range222End = 1000;
                let range323Start = 1001;
                let range323End = 9999;
                // "222" | "323" | "both"
                let paoRangeMode = "both";

                // Everest state
                let everestScore = 0;
                let everestCurrentPos = -1;
                let everestFromDigit = 1,
                    everestToDigit = 3000;
                let everestRawMode = false;
                let everestEasyMode = false;
                let everestAnswered = false;
                let everestInProgress = false; // true when a session is active
                // Per-mode high scores keyed by mode string: "normal" | "raw" | "easy" | "raw+easy"
                let everestHighScores = {}; // { modeKey: {score, from, to} }
                // Legacy single HS kept for migration on first load
                let everestHighScore = 0,
                    everestHSFrom = 1,
                    everestHSTo = 3000;
                function everestModeKey() {
                    if (everestRawMode && everestEasyMode) return "raw+easy";
                    if (everestRawMode) return "raw";
                    if (everestEasyMode) return "easy";
                    return "normal";
                }
                function everestGetHS() {
                    return (
                        everestHighScores[everestModeKey()] || {
                            score: 0,
                            from: 1,
                            to: 3000,
                        }
                    );
                }

                // DOM Elements
                let piInput, outputDiv, outputContainer, helperTextElement;
                let settingsModal, imagesModal, practiceModal, srsModal;
                let personListTextarea, actionListTextarea, objectListTextarea;
                let practiceSeekImg, practiceSeekPos;
                let pracPerson,
                    pracPersonNum,
                    pracAction,
                    pracActionNum,
                    pracObject,
                    pracObjectNum;
                let imagesListDiv;
                let flashcardEl;
                let volSlider;
                let imgPopup,
                    imgPopupImg,
                    imgPopupImg2,
                    imgPopupLabel,
                    imgPopupDigits;

                const SCALES = {
                    major: [
                        261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88,
                        523.25,
                    ],
                    pentatonic: [
                        261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33,
                        659.25,
                    ],
                    harmonic: [
                        261.63, 293.66, 311.13, 349.23, 392.0, 415.3, 493.88,
                        523.25,
                    ],
                };

                // --- Anki Image Parsing ---
                function extractImgSrc(htmlStr) {
                    if (!htmlStr) return null;
                    // Match src="..." inside an img tag
                    const m = htmlStr.match(/src=["']([^"']+)["']/i);
                    if (!m) return null;
                    const src = m[1];
                    // If it's already a full URL, return as-is
                    if (
                        src.startsWith("http://") ||
                        src.startsWith("https://") ||
                        src.startsWith("data:")
                    )
                        return src;
                    // Otherwise it's a local filename — prefix with media path
                    return null; // We'll store the raw filename and add path later
                }

                function extractImgFilename(htmlStr) {
                    if (!htmlStr) return null;
                    // Anki exports wrap the whole cell in quotes and escapes inner quotes as ""
                    // Unescape "" -> " first, then strip outer quotes if present
                    let s = htmlStr.trim();
                    if (s.startsWith('"') && s.endsWith('"'))
                        s = s.slice(1, -1);
                    s = s.replace(/""/g, '"');
                    // Now extract src="..." or src='...'
                    const m = s.match(/src=["']([^"']+)["']/i);
                    if (!m) return null;
                    const src = m[1];
                    if (!src || src.trim() === "") return null;
                    return src.trim();
                }

                function parseAnkiTxt(text) {
                    const result = {};
                    const lines = text.split("\n");
                    for (const line of lines) {
                        if (line.startsWith("#") || !line.trim()) continue;
                        const cols = line.split("\t");
                        if (cols.length < 3) continue;
                        const numRaw = cols[0].trim();
                        if (!numRaw || numRaw === "-") continue;

                        // Two supported Anki-export shapes:
                        //   5-col: Number | Person | Object | PersonImg | ObjectImg
                        //   6-col: Number | Person | Action | Object | PersonImg | ObjectImg
                        // (The 6-col form is for decks that include the shared
                        // 2-digit Action field as a separate Anki field.)
                        const hasAction = cols.length >= 6;
                        const personImgHtml = hasAction
                            ? cols[4] || ""
                            : cols[3] || "";
                        const objectImgHtml = hasAction
                            ? cols[5] || ""
                            : cols[4] || "";

                        const personSrc = extractImgFilename(personImgHtml);
                        const objectSrc = extractImgFilename(objectImgHtml);
                        const personName = (cols[1] || "").trim();
                        const objectName = (hasAction ? cols[3] : cols[2] || "").trim();

                        // Store under both padded forms so pNum lookups always hit
                        const num2 = numRaw.padStart(2, "0");
                        const num3 = numRaw.padStart(3, "0");
                        const entry = { personSrc, objectSrc, personName, objectName };
                        result[numRaw] = entry;
                        result[num2] = entry;
                        result[num3] = entry;
                    }
                    console.log(
                        "[Anki] parsed entries:",
                        Object.keys(result).length / 3,
                        "| sample 86:",
                        result["86"],
                        "| sample 864:",
                        result["864"],
                    );
                    return result;
                }

                function getImgSrc(filename) {
                    if (!filename) return null;
                    if (
                        filename.startsWith("http://") ||
                        filename.startsWith("https://") ||
                        filename.startsWith("data:") ||
                        filename.startsWith("blob:")
                    )
                        return filename;
                    return (
                        mediaFileMap[filename] ||
                        (ankiMediaPath
                            ? ankiMediaPath + "/" + filename
                            : filename)
                    );
                }

                // --- Hover Image Popup ---
                function attachHoverImage(el, filename, label, digits) {
                    // Remove any previously stored handlers
                    if (el._hoverEnter)
                        el.removeEventListener("mouseenter", el._hoverEnter);
                    if (el._hoverMove)
                        el.removeEventListener("mousemove", el._hoverMove);
                    if (el._hoverLeave)
                        el.removeEventListener("mouseleave", el._hoverLeave);
                    el._hoverEnter = el._hoverMove = el._hoverLeave = null;

                    if (!filename) {
                        el.classList.remove("has-image");
                        return;
                    }
                    el.classList.add("has-image");

                    el._hoverEnter = (e) => {
                        imgPopupImg.src = getImgSrc(filename);
                        imgPopupImg.alt = label || "";
                        imgPopupImg.style.display = "block";
                        if (imgPopupImg2) {
                            imgPopupImg2.src = "";
                            imgPopupImg2.style.display = "none";
                        }
                        if (imgPopupLabel) {
                            imgPopupLabel.textContent = label || "";
                            // Reset display in case showImageLogic hid it
                            // earlier (typing-screen popup hides the label).
                            imgPopupLabel.style.display = label
                                ? "block"
                                : "none";
                        }
                        if (imgPopupDigits) {
                            imgPopupDigits.textContent = digits || "";
                            imgPopupDigits.style.display = digits
                                ? "block"
                                : "none";
                        }
                        imgPopup.style.display = "block";
                        positionPopup(e);
                    };
                    el._hoverMove = positionPopup;
                    el._hoverLeave = () => {
                        imgPopup.style.display = "none";
                        imgPopupImg.src = "";
                    };

                    el.addEventListener("mouseenter", el._hoverEnter);
                    el.addEventListener("mousemove", el._hoverMove);
                    el.addEventListener("mouseleave", el._hoverLeave);
                }

                // Show both person + object images on hover
                function attachHoverDualImage(el, pSrc, oSrc, label, digits) {
                    if (el._hoverEnter)
                        el.removeEventListener("mouseenter", el._hoverEnter);
                    if (el._hoverMove)
                        el.removeEventListener("mousemove", el._hoverMove);
                    if (el._hoverLeave)
                        el.removeEventListener("mouseleave", el._hoverLeave);
                    if (!pSrc && !oSrc) return;
                    el.style.cursor = "pointer";

                    el._hoverEnter = (e) => {
                        if (pSrc) {
                            imgPopupImg.src = pSrc;
                            imgPopupImg.style.display = "block";
                        } else {
                            imgPopupImg.src = "";
                            imgPopupImg.style.display = "none";
                        }
                        if (oSrc) {
                            imgPopupImg2.src = oSrc;
                            imgPopupImg2.style.display = "block";
                            imgPopup.classList.add("dual-img");
                        } else {
                            imgPopupImg2.src = "";
                            imgPopupImg2.style.display = "none";
                            imgPopup.classList.remove("dual-img");
                        }
                        if (imgPopupLabel) {
                            imgPopupLabel.textContent = label || "";
                            // Reset display in case showImageLogic hid it
                            // earlier (typing-screen popup hides the label).
                            imgPopupLabel.style.display = label
                                ? "block"
                                : "none";
                        }
                        if (imgPopupDigits) {
                            imgPopupDigits.textContent = digits || "";
                            imgPopupDigits.style.display = digits
                                ? "block"
                                : "none";
                        }
                        imgPopup.style.display = "block";
                        positionPopup(e);
                    };
                    el._hoverMove = positionPopup;
                    el._hoverLeave = () => {
                        imgPopup.style.display = "none";
                        imgPopupImg.src = "";
                        imgPopupImg2.src = "";
                    };
                    el.addEventListener("mouseenter", el._hoverEnter);
                    el.addEventListener("mousemove", el._hoverMove);
                    el.addEventListener("mouseleave", el._hoverLeave);
                }

                function positionPopup(e) {
                    const pad = 14;
                    const pw = imgPopup.offsetWidth || 220;
                    const ph = imgPopup.offsetHeight || 220;
                    let x = e.clientX + pad;
                    let y = e.clientY + pad;
                    if (x + pw > window.innerWidth) x = e.clientX - pw - pad;
                    if (y + ph > window.innerHeight) y = e.clientY - ph - pad;
                    // Clamp to viewport so the popup is never partially
                    // off-screen (e.g. when the popup is taller than the
                    // viewport, or the flip puts it past the top edge).
                    x = Math.max(0, Math.min(x, window.innerWidth - pw));
                    y = Math.max(0, Math.min(y, window.innerHeight - ph));
                    imgPopup.style.left = x + "px";
                    imgPopup.style.top = y + "px";
                }

                // --- Init & Audio ---
                function initAudioContext() {
                    try {
                        const AudioContext =
                            window.AudioContext || window.webkitAudioContext;
                        audioContext = new AudioContext();
                        if (audioContext.state === "suspended") {
                            const resume = () => audioContext.resume();
                            document.body.addEventListener("click", resume, {
                                once: true,
                            });
                            document.body.addEventListener("keydown", resume, {
                                once: true,
                            });
                        }
                    } catch (e) {
                        console.error("Web Audio API not supported", e);
                    }
                }

                function playNote(inputLength) {
                    if (!audioContext || volume === 0 || !SCALES[currentScale])
                        return;
                    const scaleNotes = SCALES[currentScale];
                    const groupSize = currentPAOMode === "323" ? 8 : 6;
                    let noteIndex = (inputLength - 1) % groupSize;
                    if (noteIndex >= scaleNotes.length)
                        noteIndex %= scaleNotes.length;
                    const osc = audioContext.createOscillator();
                    osc.type = currentWaveform;
                    osc.frequency.setValueAtTime(
                        scaleNotes[noteIndex],
                        audioContext.currentTime,
                    );
                    const gain = audioContext.createGain();
                    gain.gain.setValueAtTime(
                        0.4 * volume,
                        audioContext.currentTime,
                    );
                    gain.gain.exponentialRampToValueAtTime(
                        0.001 * volume,
                        audioContext.currentTime + 0.4,
                    );
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    osc.start();
                    osc.stop(audioContext.currentTime + 0.4);
                }

                // --- Data & Helper Functions ---
                function parsePaoList(text) {
                    const map = {};
                    if (!text) return map;
                    // Accept newline OR semicolon as the record separator.
                    text.split(/[\n;]/).forEach((rawLine) => {
                        const line = rawLine.trim();
                        if (!line || line.startsWith("#")) return;
                        // Accept a variety of number<->term separators:
                        //   "00 - Zeus", "00:Zeus", "00,Zeus", "00\tZeus", "00 Zeus"
                        // We split on the FIRST run of non-digit chars after the number.
                        const m = line.match(/^(\d+)\s*[-:,\t ]\s*(.+)$/);
                        if (m) {
                            const k = m[1];
                            const v = m[2].trim();
                            if (v) map[k] = v;
                        } else {
                            // Fallback: try the old dash-split
                            const parts = line.split(/-(.+)/);
                            if (parts.length >= 2) {
                                const k = parts[0].trim();
                                const v = parts[1].trim();
                                if (/^\d+$/.test(k) && v) map[k] = v;
                            }
                        }
                    });
                    return map;
                }
                function formatPaoList(map) {
                    // Group 2-digit keys (00-99) before 3-digit keys (000-999),
                    // then sort each group numerically. This avoids the two
                    // ranges interleaving when both have the same numeric
                    // value (e.g. "00" and "000" both = 0).
                    const entries = Object.entries(map);
                    const twos = entries
                        .filter(([k]) => k.length === 2)
                        .sort(([a], [b]) => Number(a) - Number(b));
                    const threes = entries
                        .filter(([k]) => k.length === 3)
                        .sort(([a], [b]) => Number(a) - Number(b));
                    return [...twos, ...threes]
                        .map(([k, v]) => `${k} - ${v}`)
                        .join("\n");
                }
                function getActiveList(type) {
                    if (type === "p")
                        return paoDataSource === "excel"
                            ? excelPersonList
                            : personList;
                    if (type === "a")
                        return paoDataSource === "excel"
                            ? excelActionList
                            : actionList;
                    return paoDataSource === "excel"
                        ? excelObjectList
                        : objectList;
                }
                function getGroupSizeForMode(m) {
                    return m === "323" ? 8 : 6;
                }
                function getPAOLengthsForMode(m) {
                    return m === "323"
                        ? { p: 3, a: 2, o: 3 }
                        : { p: 2, a: 2, o: 2 };
                }
                function getGroupSize() {
                    return getGroupSizeForMode(currentPAOMode);
                }
                function getPAOLengths() {
                    return getPAOLengthsForMode(currentPAOMode);
                }

                function getModeForPos(oneBasedPos) {
                    if (paoRangeMode === "222") return "222";
                    if (paoRangeMode === "323") return "323";
                    // "both": 2-2-2 for positions 1..crossover, 3-2-3 for crossover+1..
                    return oneBasedPos - 1 < rangeCrossover ? "222" : "323";
                }
                function updateAutoMode(oneBasedPos) {
                    currentPAOMode = getModeForPos(oneBasedPos);
                    // PAO mode indicator removed
                }

                // --- Settings Logic ---
                function loadSettings() {
                    try {
                        const s = JSON.parse(
                            _storage.getItem("piPaoSettings") || "{}",
                        );
                        currentPAOMode = s.currentPAOMode || "222";
                        paoDataSource = s.paoDataSource || "textarea";
                        paoRangeMode = s.paoRangeMode || "both";
                        // Crossover: 0-based, exclusive — 2-2-2 covers
                        // positions 1..crossover, 3-2-3 covers crossover+1..
                        if (typeof s.rangeCrossover === "number") {
                            rangeCrossover = s.rangeCrossover;
                        } else {
                            // Derive from the legacy four vars (if present)
                            // or fall back to the default.
                            if (s.range323Start != null) {
                                rangeCrossover = s.range323Start - 1;
                            } else {
                                rangeCrossover = 1000;
                            }
                        }
                        range222Start = s.range222Start || 1;
                        range222End = s.range222End || rangeCrossover;
                        range323Start = s.range323Start || rangeCrossover + 1;
                        everestHighScore = s.everestHighScore || 0;
                        everestHSFrom = s.everestHSFrom || 1;
                        everestHSTo = s.everestHSTo || 3000;
                        everestScore = s.everestScore || 0;
                        everestCurrentPos =
                            s.everestCurrentPos != null
                                ? s.everestCurrentPos
                                : -1;
                        everestFromDigit = s.everestFromDigit || 1;
                        everestToDigit = s.everestToDigit || 3000;
                        everestAnswered = s.everestAnswered || false;
                        everestInProgress = s.everestInProgress || false;
                        everestRawMode = s.everestRawMode || false;
                        everestEasyMode = s.everestEasyMode || false;
                        // Per-mode HS: load saved object, then migrate legacy single HS into "normal" slot if needed
                        everestHighScores = s.everestHighScores || {};
                        if (!everestHighScores.normal && everestHighScore > 0) {
                            everestHighScores.normal = {
                                score: everestHighScore,
                                from: everestHSFrom,
                                to: everestHSTo,
                            };
                        }
                        testShowTimer = s.testShowTimer ?? true;
                        dailyGoal = s.dailyGoal || 400;
                        dailyStats = s.dailyStats || {};
                        dailyReviewStats = s.dailyReviewStats || {};
                        posTypedDates = s.posTypedDates || {};
                        personList = s.personList || {};
                        actionList = s.actionList || {};
                        objectList = s.objectList || {};
                        excelPersonList = s.excelPersonList || {};
                        excelActionList = s.excelActionList || {};
                        excelObjectList = s.excelObjectList || {};
                        excelColumnConfig =
                            s.excelColumnConfig || excelColumnConfig;
                        srsData = s.srsData || {};
                        srsSessionDate = s.srsSessionDate || "";
                        srsNewSeenToday = s.srsNewSeenToday || 0;
                        // Reset session counter if it's a new day
                        if (srsSessionDate !== srsToday()) {
                            srsSessionDate = "";
                            srsNewSeenToday = 0;
                        }
                        const _sv = (id, val) => {
                            const el = document.getElementById(id);
                            if (el && val !== undefined) el.value = val;
                        };
                        const _sc = (id, val) => {
                            const el = document.getElementById(id);
                            if (el && val !== undefined) el.checked = val;
                        };
                        _sv("srsNewPerDay", s.srsNewPerDay);
                        _sv("srsMaxReviews", s.srsMaxReviews);
                        _sv("srsLearningSteps", s.srsLearningSteps);
                        _sv("srsRelrnSteps", s.srsRelrnSteps);
                        _sv("srsInsertionOrder", s.srsInsertionOrder);
                        _sv("srsNewReviewOrder", s.srsNewReviewOrder);
                        _sv("srsReviewSortOrder", s.srsReviewSortOrder);
                        currentBackgroundColor =
                            s.backgroundColor || DEFAULT_BG_COLOR;
                        correctColor = s.correctColor || DEFAULT_CORRECT_COLOR;
                        incorrectColor =
                            s.incorrectColor || DEFAULT_INCORRECT_COLOR;
                        accentColor = s.accentColor || DEFAULT_ACCENT_COLOR;
                        heatmapScheme = s.heatmapScheme || "ice";
                        range323End = s.range323End || 10000;
                        lockOnIncorrect = s.lockOnIncorrect ?? true;
                        darkMode = s.darkMode ?? false;
                        helperTime = s.helperTime || 1500;
                        hintHotkey = s.hintHotkey || "H";
                        hintHotkey = s.hintHotkey || "W";
                        revealHotkey = s.revealHotkey || "N";
                        imgHotkey = s.imgHotkey || "I";
                        browseHotkey = s.browseHotkey || "B";
                        statsHotkey = s.statsHotkey || "S";
                        everestHotkey = s.everestHotkey || "E";
                        mistakeHotkey = s.mistakeHotkey || "A";
                        hardHotkey = s.hardHotkey || "H";
                        listHotkey = s.listHotkey || "L";
                        reviewHotkey = s.reviewHotkey || "R";
                        autoMistake = s.autoMistake ?? false;
                        goalBarUpdate = s.goalBarUpdate || "digit";
                        goalBarPosition = s.goalBarPosition || "top";
                        goalBarHidden = s.goalBarHidden ?? false;
                        dayOffsetHours = s.dayOffsetHours ?? 4;
                        srsRawMode = s.srsRawMode ?? false;
                        isReviewMode = s.isReviewMode ?? false;
                        currentScale = s.currentScale || "major";
                        currentWaveform = s.currentWaveform || "sine";
                        useCustomBg = s.useCustomBg ?? false;
                        volume = s.volume ?? 0.5;
                        // practiceIndex stores abs digit pos (0-based group start).
                        // If piPosVersion is missing, old save had group index — migrate.
                        const rawPI = s.practiceIndex || 0;
                        if (!s.piPosVersion) {
                            practiceIndex = snapToGroupStart(rawPI * 6);
                        } else {
                            practiceIndex = snapToGroupStart(rawPI);
                        }
                        ankiMediaPath = s.ankiMediaPath || "media";
                        mediaFolderName = s.mediaFolderName || "";
                        ankiImages = s.ankiImages || {};
                        ankiImages2 = s.ankiImages2 || {};
                        if (s.sequenceStartIndex != null)
                            sequenceStartIndex = s.sequenceStartIndex;
                        const savedPiValue = s.piInputValue || "";

                        document.querySelector(
                            `input[name="paoDataSource"][value="${paoDataSource}"]`,
                        ).checked = true;
                        const rmode = document.querySelector(
                            `input[name="paoRangeMode"][value="${paoRangeMode}"]`,
                        );
                        if (rmode) rmode.checked = true;
                        _applyPaoRangeMode();
                        // Mirror the crossover into its input (if it exists)
                        const crossEl = document.getElementById("rangeCrossover");
                        if (crossEl) crossEl.value = rangeCrossover;
                        personListTextarea.value = formatPaoList(personList);
                        actionListTextarea.value = formatPaoList(actionList);
                        objectListTextarea.value = formatPaoList(objectList);
                        // Validate the textareas on settings load
                        _updateSettingsPaoValidation();
                        document.getElementById("excelNumCol").value =
                            excelColumnConfig.numCol;
                        document.getElementById("excelPerson3Col").value =
                            excelColumnConfig.person3Col;
                        document.getElementById("excelAction2Col").value =
                            excelColumnConfig.action2Col;
                        document.getElementById("excelObject3Col").value =
                            excelColumnConfig.object3Col;
                        document.getElementById("excelPerson2Col").value =
                            excelColumnConfig.person2Col;
                        document.getElementById("excelObject2Col").value =
                            excelColumnConfig.object2Col;
                        document.getElementById("colorPicker").value =
                            currentBackgroundColor;
                        document.getElementById("correctColorPicker").value =
                            correctColor;
                        document.getElementById("incorrectColorPicker").value =
                            incorrectColor;
                        const accEl =
                            document.getElementById("accentColorPicker");
                        if (accEl) accEl.value = accentColor;
                        const rangeCrossoverEl =
                            document.getElementById("rangeCrossover");
                        if (rangeCrossoverEl)
                            rangeCrossoverEl.value = rangeCrossover;
                        const schemeEl =
                            document.getElementById("heatmapSchemeSelect");
                        if (schemeEl) schemeEl.value = heatmapScheme;
                        applyAccentColor();
                        document.getElementById("lockOnIncorrect").checked =
                            lockOnIncorrect;
                        document.getElementById("darkModeToggle").checked =
                            darkMode;
                        document.body.classList.toggle("dark-mode", darkMode);
                        document.getElementById("helperTime").value =
                            helperTime;
                        document.getElementById("hintHotkey").value =
                            hintHotkey;
                        document.getElementById("revealHotkey").value =
                            revealHotkey;
                        if (document.getElementById("imgHotkey"))
                            document.getElementById("imgHotkey").value =
                                imgHotkey;
                        if (document.getElementById("browseHotkey"))
                            document.getElementById("browseHotkey").value =
                                browseHotkey;
                        if (document.getElementById("statsHotkey"))
                            document.getElementById("statsHotkey").value =
                                statsHotkey;
                        if (document.getElementById("everestHotkey"))
                            document.getElementById("everestHotkey").value =
                                everestHotkey;
                        if (document.getElementById("mistakeHotkey"))
                            document.getElementById("mistakeHotkey").value =
                                mistakeHotkey;
                        if (document.getElementById("hardHotkey"))
                            document.getElementById("hardHotkey").value =
                                hardHotkey;
                        if (document.getElementById("listHotkey"))
                            document.getElementById("listHotkey").value =
                                listHotkey;
                        if (document.getElementById("reviewHotkey"))
                            document.getElementById("reviewHotkey").value =
                                reviewHotkey;
                        if (document.getElementById("autoMistake"))
                            document.getElementById("autoMistake").checked =
                                autoMistake;
                        if (document.getElementById("goalBarUpdate"))
                            document.getElementById("goalBarUpdate").value =
                                goalBarUpdate;
                        if (document.getElementById("goalBarPosition"))
                            document.getElementById("goalBarPosition").value =
                                goalBarPosition;
                        if (document.getElementById("goalBarHidden"))
                            document.getElementById("goalBarHidden").checked =
                                goalBarHidden;
                        const dslider =
                            document.getElementById("dayOffsetSlider");
                        if (dslider) {
                            dslider.value = dayOffsetHours;
                            document.getElementById(
                                "dayOffsetLabel",
                            ).textContent = dayOffsetHours;
                        }
                        applyGoalBarSettings();
                        document.getElementById("scaleSelect").value =
                            currentScale;
                        document.getElementById("waveformSelect").value =
                            currentWaveform;
                        document.getElementById("useCustomBackground").checked =
                            useCustomBg;
                        const mediaPathEl =
                            document.getElementById("ankiMediaPathInput");
                        if (mediaPathEl)
                            mediaPathEl.value = ankiMediaPath || "media";
                        const mfStatus =
                            document.getElementById("mediaFolderStatus");
                        if (mfStatus) {
                            if (mediaFolderName) {
                                const mapSize =
                                    Object.keys(mediaFileMap).length;
                                if (mapSize > 0) {
                                    mfStatus.textContent = `✓ ${mediaFolderName} (${mapSize} files)`;
                                    mfStatus.className = "anki-status loaded js-media-status";
                                } else {
                                    // Blobs may still be restoring from IDB;
                                    // show a neutral placeholder that
                                    // _setMediaStatus will overwrite.
                                    mfStatus.textContent = `Loading ${mediaFolderName}…`;
                                    mfStatus.className = "anki-status js-media-status";
                                }
                            } else {
                                mfStatus.textContent = "No media selected.";
                                mfStatus.className = "anki-status js-media-status";
                            }
                        }
                        if (volSlider)
                            volSlider.value = Math.round(volume * 10);
                        if (savedPiValue && piInput) {
                            piInput.value = savedPiValue;
                            checkPiDigits(piInput);
                        }
                        updateAutoMode(
                            sequenceStartIndex + currentInputLength + 1,
                        );
                        setTimeout(() => everestRefreshHSDisplay(), 0);
                        const everestHideInfoEl =
                            document.getElementById("everestHideInfo");
                        if (everestHideInfoEl)
                            everestHideInfoEl.checked = everestRawMode;
                        const everestEasyModeEl =
                            document.getElementById("everestEasyMode");
                        if (everestEasyModeEl)
                            everestEasyModeEl.checked = everestEasyMode;
                        everestRefreshHSDisplay();

                        const count = Object.keys(ankiImages).length;
                        const statusEl =
                            document.getElementById("ankiLoadStatus");
                        if (count > 0) {
                            statusEl.textContent = `✓ ${Math.round(count / 3)} entries loaded`;
                            statusEl.className = "anki-status loaded";
                        } else {
                            statusEl.textContent = "No file loaded.";
                            statusEl.className = "anki-status";
                        }
                        const count2 = Object.keys(ankiImages2).length;
                        const statusEl2 =
                            document.getElementById("ankiLoadStatus2");
                        if (statusEl2) {
                            if (count2 > 0) {
                                statusEl2.textContent = `✓ ${Math.round(count2 / 3)} entries loaded`;
                                statusEl2.className = "anki-status loaded";
                            } else {
                                statusEl2.textContent = "No file loaded.";
                                statusEl2.className = "anki-status";
                            }
                        }

                        updateThemeColors();
                        setBackground();
                        updateSettingsUI();
                        const goalInput =
                            document.getElementById("dailyGoalInput");
                        if (goalInput) goalInput.value = dailyGoal;
                        statsRefreshDisplay();
                        srsUpdateBadge();
                    } catch (e) {
                        console.error("Load Error", e);
                    }
                }

                function saveSettings() {
                    if (paoDataSource === "textarea") {
                        personList = parsePaoList(personListTextarea.value);
                        actionList = parsePaoList(actionListTextarea.value);
                        objectList = parsePaoList(objectListTextarea.value);
                    }
                    // Refresh the on-page PAO validation status indicators
                    if (typeof _updateSettingsPaoValidation === "function")
                        _updateSettingsPaoValidation();
                    lockOnIncorrect =
                        document.getElementById("lockOnIncorrect").checked;
                    darkMode =
                        document.getElementById("darkModeToggle").checked;
                    document.body.classList.toggle("dark-mode", darkMode);
                    helperTime =
                        parseInt(document.getElementById("helperTime").value) ||
                        1500;
                    hintHotkey = document
                        .getElementById("hintHotkey")
                        .value.toUpperCase();
                    revealHotkey = document
                        .getElementById("revealHotkey")
                        .value.toUpperCase();
                    imgHotkey = (
                        document.getElementById("imgHotkey")?.value || "I"
                    ).toUpperCase();
                    browseHotkey = (
                        document.getElementById("browseHotkey")?.value || "B"
                    ).toUpperCase();
                    statsHotkey = (
                        document.getElementById("statsHotkey")?.value || "S"
                    ).toUpperCase();
                    everestHotkey = (
                        document.getElementById("everestHotkey")?.value || "E"
                    ).toUpperCase();
                    mistakeHotkey = (
                        document.getElementById("mistakeHotkey")?.value || "A"
                    ).toUpperCase();
                    hardHotkey = (
                        document.getElementById("hardHotkey")?.value || "H"
                    ).toUpperCase();
                    listHotkey = (
                        document.getElementById("listHotkey")?.value || "L"
                    ).toUpperCase();
                    reviewHotkey = (
                        document.getElementById("reviewHotkey")?.value || "R"
                    ).toUpperCase();
                    autoMistake =
                        document.getElementById("autoMistake")?.checked ??
                        false;
                    dayOffsetHours =
                        parseInt(
                            document.getElementById("dayOffsetSlider")?.value,
                        ) ?? 4;
                    goalBarUpdate =
                        document.getElementById("goalBarUpdate")?.value ||
                        "digit";
                    goalBarPosition =
                        document.getElementById("goalBarPosition")?.value ||
                        "top";
                    goalBarHidden =
                        document.getElementById("goalBarHidden")?.checked ??
                        false;
                    applyGoalBarSettings();
                    currentBackgroundColor =
                        document.getElementById("colorPicker").value;
                    correctColor =
                        document.getElementById("correctColorPicker").value;
                    incorrectColor = document.getElementById(
                        "incorrectColorPicker",
                    ).value;
                    const accEl = document.getElementById("accentColorPicker");
                    if (accEl) accentColor = accEl.value;
                    applyAccentColor();
                    currentScale = document.getElementById("scaleSelect").value;
                    currentWaveform =
                        document.getElementById("waveformSelect").value;
                    useCustomBg = document.getElementById(
                        "useCustomBackground",
                    ).checked;
                    ankiMediaPath =
                        document
                            .getElementById("ankiMediaPathInput")
                            ?.value.trim() || "media";
                    excelColumnConfig.numCol = document
                        .getElementById("excelNumCol")
                        .value.toUpperCase();
                    excelColumnConfig.person3Col = document
                        .getElementById("excelPerson3Col")
                        .value.toUpperCase();
                    excelColumnConfig.action2Col = document
                        .getElementById("excelAction2Col")
                        .value.toUpperCase();
                    excelColumnConfig.object3Col = document
                        .getElementById("excelObject3Col")
                        .value.toUpperCase();
                    excelColumnConfig.person2Col = document
                        .getElementById("excelPerson2Col")
                        .value.toUpperCase();
                    excelColumnConfig.object2Col = document
                        .getElementById("excelObject2Col")
                        .value.toUpperCase();

                    // PAO range mode radio (222 / 323 / both)
                    const rmodeEl = document.querySelector(
                        'input[name="paoRangeMode"]:checked',
                    );
                    if (rmodeEl) paoRangeMode = rmodeEl.value || "both";
                    // Crossover: 0-based, exclusive
                    if (paoRangeMode === "both") {
                        const crossEl =
                            document.getElementById("rangeCrossover");
                        if (crossEl)
                            rangeCrossover =
                                parseInt(crossEl.value) || rangeCrossover;
                    }
                    _applyPaoRangeMode();
                    const schemeEl = document.getElementById(
                        "heatmapSchemeSelect",
                    );
                    if (schemeEl) heatmapScheme = schemeEl.value || "ice";

                    const s = {
                        currentPAOMode,
                        paoDataSource,
                        personList,
                        actionList,
                        objectList,
                        excelPersonList,
                        excelActionList,
                        excelObjectList,
                        excelColumnConfig,
                        srsData,
                        srsSessionDate,
                        srsNewSeenToday,
                        srsNewPerDay:
                            parseInt(
                                document.getElementById("srsNewPerDay")?.value,
                            ) || 20,
                        srsMaxReviews:
                            parseInt(
                                document.getElementById("srsMaxReviews")?.value,
                            ) || 200,
                        srsLearningSteps:
                            document.getElementById("srsLearningSteps")
                                ?.value || "1 10",
                        srsRelrnSteps:
                            document.getElementById("srsRelrnSteps")?.value ||
                            "10",
                        srsInsertionOrder:
                            document.getElementById("srsInsertionOrder")
                                ?.value || "sequential",
                        srsNewReviewOrder:
                            document.getElementById("srsNewReviewOrder")
                                ?.value || "mix",
                        srsReviewSortOrder:
                            document.getElementById("srsReviewSortOrder")
                                ?.value || "due-random",
                        backgroundColor: currentBackgroundColor,
                        correctColor,
                        incorrectColor,
                        accentColor,
                        lockOnIncorrect,
                        helperTime,
                        hintHotkey,
                        revealHotkey,
                        imgHotkey,
                        browseHotkey,
                        statsHotkey,
                        everestHotkey,
                        mistakeHotkey,
                        hardHotkey,
                        listHotkey,
                        reviewHotkey,
                        autoMistake,
                        currentScale,
                        currentWaveform,
                        useCustomBg,
                        volume,
                        goalBarUpdate,
                        goalBarPosition,
                        goalBarHidden,
                        dayOffsetHours,
                        srsRawMode,
                        practiceIndex,
                        ankiMediaPath,
                        mediaFolderName,
                        ankiImages,
                        ankiImages2,
                        piPosVersion: 2,
                        range222Start,
                        range222End,
                        range323Start,
                        range323End,
                        rangeCrossover,
                        paoRangeMode,
                        heatmapScheme,
                        everestHighScore,
                        everestHSFrom,
                        everestHSTo,
                        everestRawMode,
                        everestEasyMode,
                        everestHighScores,
                        everestScore,
                        everestCurrentPos,
                        everestFromDigit,
                        everestToDigit,
                        everestAnswered,
                        everestInProgress,
                        sequenceStartIndex,
                        piInputValue:
                            typeof piInput !== "undefined" && piInput
                                ? piInput.value
                                : "",
                        testShowTimer,
                        dailyGoal,
                        dailyStats,
                        dailyReviewStats,
                        posTypedDates,
                        isReviewMode,
                        darkMode,
                    };
                    _storage.setItem("piPaoSettings", JSON.stringify(s));
                    _fbSchedulePush(); // auto-sync to cloud if connected
                    updateThemeColors();
                    setBackground();
                }

                // Debounced version of saveSettings for high-frequency paths
                // (typing digits). Waits 300ms after the last keystroke before
                // serializing and flushing to localStorage, so rapid typing
                // doesn't cause jank.
                let _saveSettingsTimer = null;
                function saveSettingsDebounced() {
                    if (_saveSettingsTimer) clearTimeout(_saveSettingsTimer);
                    _saveSettingsTimer = setTimeout(() => {
                        saveSettings();
                        _saveSettingsTimer = null;
                    }, 300);
                }

                // --- Game Logic ---
                function checkPiDigits(input) {
                    let val = input.value.replace(/\D/g, "");

                    // Only do a full re-search of all of pi when the typed value can no
                    // longer be explained as a continuation/truncation of the digits we're
                    // already tracking at sequenceStartIndex. Re-searching on every keystroke
                    // (old behavior) would jump sequenceStartIndex to the FIRST place in pi
                    // that matches the short typed-so-far string (e.g. "1", "14", "141" all
                    // occur very early in pi), silently desyncing position tracking and the
                    // daily digit count from what was actually typed/backspaced.
                    const isContinuationOfCurrent =
                        val.length > 0 &&
                        val.length <= PI_DIGITS.length - sequenceStartIndex &&
                        PI_DIGITS.substr(sequenceStartIndex, val.length) ===
                            val;
                    let foundIndex = isContinuationOfCurrent
                        ? sequenceStartIndex
                        : PI_DIGITS.indexOf(val);

                    // In test mode: no locking, no mistake detection during typing
                    if (!testMode && lockOnIncorrect && foundIndex === -1) {
                        for (let i = 0; i < val.length; i++) {
                            if (val[i] !== PI_DIGITS[sequenceStartIndex + i]) {
                                if (val.length > i + 1)
                                    val = val.substring(0, i + 1);
                                break;
                            }
                        }
                    }
                    input.value = val;
                    currentInputLength = val.length;
                    if (val.length === 0) {
                        outputDiv.innerHTML = "";
                        document.getElementById("position").innerHTML = "";
                        testUpdateSubmitBtn();
                        return;
                    }
                    if (foundIndex !== -1) {
                        sequenceStartIndex = foundIndex;
                        updateAutoMode(sequenceStartIndex + val.length);
                        playNote(val.length);
                    }

                    // Build all groups and render — scrolls to show most recent
                    let html = "";
                    let valPos = 0;
                    while (valPos < val.length) {
                        const absPos = sequenceStartIndex + valPos;
                        const gMode = getModeForPos(absPos + 1);
                        const gSize = getGroupSizeForMode(gMode);
                        const chunk = val.substr(valPos, gSize);
                        let inner = "";
                        for (let j = 0; j < chunk.length; j++) {
                            const d = chunk[j];
                            if (testMode) {
                                inner += `<span>${d}</span>`;
                            } else {
                                const correct = PI_DIGITS[absPos + j];
                                const cls =
                                    d === correct ? "correct" : "incorrect";
                                inner += `<span class="${cls}">${d}</span>`;
                            }
                        }
                        html += `<span class="digit-group">${inner}</span>`;
                        valPos += gSize;
                    }
                        // Defer DOM update to next frame to prevent typing lag
                    requestAnimationFrame(() => {
                        outputDiv.innerHTML = html;
                        outputDiv.classList.toggle(
                            "mode-323",
                            currentPAOMode === "323",
                        );
                        outputContainer.scrollTop = outputContainer.scrollHeight;
                        outputDiv.scrollLeft = outputDiv.scrollWidth;
                        document.getElementById("position").innerHTML =
                            `#${sequenceStartIndex + 1} &thinsp;→&thinsp; #${sequenceStartIndex + currentInputLength} &thinsp;<span style="opacity:0.7;font-size:0.85em;">(${currentInputLength})</span>`;
                    });

                    if (testMode) {
                        if (!testTimerRunning && !testSubmitted)
                            testStartTimer();
                        testUpdateSubmitBtn();
                    }
                    // Auto-add completed groups to SRS deck
                    // Auto-mistake: if the user types a wrong digit and autoMistake is enabled
                    if (
                        !testMode &&
                        autoMistake &&
                        foundIndex === -1 &&
                        val.length > 0
                    ) {
                        const _mistakePos = snapToGroupStart(
                            sequenceStartIndex + val.length - 1,
                        );
                        // Only auto-add once per chunk (don't spam on every wrong key)
                        if (
                            _mistakePos !== currentTypingChunkPos ||
                            !currentChunkMistakePressed
                        ) {
                            mistakeRedoStack = [];
                            const _mMode = getModeForPos(_mistakePos + 1);
                            const _mGSize = getGroupSizeForMode(_mMode);
                            const _mDigits = PI_DIGITS.slice(_mistakePos, _mistakePos + _mGSize);
                            mistakeUndoStack.push({
                                pos: _mistakePos,
                                oldCard: srsData[_mistakePos]
                                    ? { ...srsData[_mistakePos] }
                                    : null,
                                digits: _mDigits,
                            });
                            if (mistakeUndoStack.length > 20)
                                mistakeUndoStack.shift();
                            if (!srsData[_mistakePos]) {
                                srsData[_mistakePos] = {
                                    interval: 0,
                                    easeFactor: 2.5,
                                    dueDate: srsToday(),
                                    reviews: 0,
                                    lapses: 0,
                                    step: 0,
                                };
                            }
                            srsRate(_mistakePos, 1, srsIsDue(_mistakePos));
                            currentChunkMistakePressed = true;
                            srsUpdateBadge();
                            const _paoD = getPAOGroupDataByPos(
                                _mistakePos,
                                _mode,
                            );
                            const _paoStr = _paoD
                                ? `${_paoD.pTerm} / ${_paoD.aTerm} / ${_paoD.oTerm}`
                                : `chunk at #${_mistakePos + 1}`;
                            showToast(`📌 Chunk added to review`);
                        }
                    }

                    if (!testMode) {
                        // Track which chunk the user is currently in (on every keystroke)
                        const _mode = getModeForPos(sequenceStartIndex + 1);
                        const _chunkSize = getGroupSizeForMode(_mode);
                        const chunkStart = snapToGroupStart(sequenceStartIndex);

                        if (currentInputLength > 0) {
                            // Compute the start of the chunk containing the last typed digit
                            const currentChunkStart =
                                sequenceStartIndex +
                                currentInputLength -
                                (currentInputLength % _chunkSize === 0
                                    ? _chunkSize
                                    : currentInputLength % _chunkSize);
                            if (currentChunkStart !== currentTypingChunkPos) {
                                currentTypingChunkPos = currentChunkStart;
                                currentChunkMistakePressed = false;
                                currentChunkLastRating = 0;
                            }
                            // Record when a chunk boundary is fully completed
                            if (currentInputLength % _chunkSize === 0) {
                                const completedChunkStart =
                                    sequenceStartIndex +
                                    currentInputLength -
                                    _chunkSize;
                                // Compute the furthest card currently in the
                                // SRS deck so we can warn the user when they
                                // type a chunk past their review range.
                                const _srsPositions = Object.keys(
                                    srsData,
                                ).map(Number);
                                const _maxCardPos =
                                    _srsPositions.length > 0
                                        ? Math.max(..._srsPositions)
                                        : 0;
                                if (
                                    _srsPositions.length > 0 &&
                                    completedChunkStart >
                                        _maxCardPos + _chunkSize
                                ) {
                                    // Past the review range — don't add to deck.
                                    // Toast every time (no gating) so the user
                                    // always knows why nothing was added.
                                    showToast(
                                        `Chunk at #${completedChunkStart + 1} not added. Max is at #${_maxCardPos + 1}`,
                                    );
                                } else if (
                                    posTypedDates[completedChunkStart] !==
                                    srsToday()
                                ) {
                                    // First completion today (within range).
                                    // Auto-add the chunk to the deck if it has
                                    // no card yet — first-time typing creates
                                    // a learning-state card. Subsequent typings
                                    // (or hotkey/auto-mistake-created cards)
                                    // just get reviewed.
                                    if (!srsData[completedChunkStart]) {
                                        srsAddCard(completedChunkStart);
                                    }
                                    if (!currentChunkMistakePressed) {
                                        srsRate(completedChunkStart, 3, srsIsDue(completedChunkStart)); // Good
                                        srsUpdateBadge();
                                    }
                                }
                                posTypedDates[completedChunkStart] = srsToday();
                            }
                        } else {
                            currentTypingChunkPos = -1;
                        }

                        creditDailyDigits(val);
                        // Update goal bar based on user's chosen update frequency.
                        // Use lightweight update (no heatmap rebuild) to prevent typing lag.
                        const _pos = sequenceStartIndex + val.length;
                        const _groupSize = _mode === "323" ? 3 : 2;
                        const _shouldUpdate =
                            goalBarUpdate === "digit"
                                ? true
                                : goalBarUpdate === "group"
                                  ? _pos % _groupSize === 0
                                  : goalBarUpdate === "chunk"
                                    ? _pos % _chunkSize === 0
                                    : true;
                        if (_shouldUpdate) updateGoalBarOnly();
                    }
                }

                function showToast(msg, ms = 2500) {
                    const el = document.getElementById("mistakeToast");
                    if (!el) return;
                    el.textContent = msg;
                    el.style.display = "block";
                    el.style.opacity = "1";
                    clearTimeout(el._timer);
                    el._timer = setTimeout(() => {
                        el.style.transition = "opacity 0.4s";
                        el.style.opacity = "0";
                        setTimeout(() => {
                            el.style.display = "none";
                            el.style.transition = "";
                        }, 420);
                    }, ms);
                }

                function showHelper(content, isHtml) {
                    if (activeHelperTimer) clearTimeout(activeHelperTimer);
                    helperTextElement.innerHTML = content;
                    helperTextElement.style.opacity = "1";
                    activeHelperTimer = setTimeout(() => {
                        helperTextElement.style.opacity = "0";
                        if (
                            !settingsModal.style.display.includes("block") &&
                            !imagesModal.style.display.includes("block") &&
                            !practiceModal.style.display.includes("block")
                        ) {
                            piInput.focus();
                        }
                    }, helperTime);
                }

                function getPAOGroupDataByPos(pos, modeOverride) {
                    const mode = modeOverride || currentPAOMode;
                    const gSize = getGroupSizeForMode(mode);
                    const lens = getPAOLengthsForMode(mode);
                    if (pos + gSize > PI_DIGITS.length) return null;
                    const digits = PI_DIGITS.substr(pos, gSize);
                    const pNum = digits.substr(0, lens.p);
                    const aNum = digits.substr(lens.p, lens.a);
                    const oNum = digits.substr(lens.p + lens.a, lens.o);
                    return {
                        pos,
                        pNum,
                        aNum,
                        oNum,
                        pTerm: getActiveList("p")[pNum] || "???",
                        aTerm: getActiveList("a")[aNum] || "???",
                        oTerm: getActiveList("o")[oNum] || "???",
                    };
                }

                function getSubSegmentType(pos) {
                    const gSize = getGroupSize();
                    const lens = getPAOLengths();
                    const mod = pos % gSize;
                    if (mod < lens.p) return "P";
                    if (mod < lens.p + lens.a) return "A";
                    return "O";
                }

                function showHintLogic() {
                    const pos = sequenceStartIndex + currentInputLength;
                    const gSize = getGroupSize();
                    const startOfGroup = Math.floor(pos / gSize) * gSize;
                    const info = getPAOGroupDataByPos(startOfGroup);
                    if (info) {
                        const type = getSubSegmentType(pos);
                        const term =
                            type === "P"
                                ? info.pTerm
                                : type === "A"
                                  ? info.aTerm
                                  : info.oTerm;
                        showHelper(term, false);
                    }
                }

                function showRevealLogic() {
                    const pos = sequenceStartIndex + currentInputLength;
                    const gSize = getGroupSize();
                    const startOfGroup = Math.floor(pos / gSize) * gSize;
                    const info = getPAOGroupDataByPos(startOfGroup);
                    if (info) {
                        const type = getSubSegmentType(pos);
                        const digits =
                            type === "P"
                                ? info.pNum
                                : type === "A"
                                  ? info.aNum
                                  : info.oNum;
                        showHelper(digits, false);
                    }
                }

                function showImageLogic() {
                    const pos = sequenceStartIndex + currentInputLength;
                    const gSize = getGroupSize();
                    const startOfGroup = Math.floor(pos / gSize) * gSize;
                    const info = getPAOGroupDataByPos(startOfGroup);
                    if (!info) return;
                    const type = getSubSegmentType(pos);
                    if (type === "A") return;
                    const key = type === "P" ? info.pNum : info.oNum;
                    const entry = lookupAnkiEntry(key);
                    if (!entry) return;
                    const src =
                        type === "P"
                            ? getImgSrc(entry.personSrc)
                            : getImgSrc(entry.objectSrc);
                    if (!src) return;
                    // Show image in popup (no text, just the image)
                    imgPopupImg.src = src;
                    imgPopupImg.style.display = "block";
                    if (imgPopupImg2) {
                        imgPopupImg2.src = "";
                        imgPopupImg2.style.display = "none";
                    }
                    imgPopup.classList.remove("dual-img");
                    // Hide all text elements
                    if (imgPopupLabel) {
                        imgPopupLabel.textContent = "";
                        imgPopupLabel.style.display = "none";
                    }
                    if (imgPopupDigits) {
                        imgPopupDigits.textContent = "";
                        imgPopupDigits.style.display = "none";
                    }
                    // Hide header (it may be showing from pi coverage hover)
                    const popupHeader = document.getElementById("imgPopupHeader");
                    if (popupHeader) popupHeader.style.display = "none";
                    // Position at top-center of screen
                    imgPopup.style.left = "50%";
                    imgPopup.style.top = "80px";
                    imgPopup.style.transform = "translateX(-50%)";
                    imgPopup.style.display = "block";
                    clearTimeout(imgPopup._autoHide);
                    imgPopup._autoHide = setTimeout(() => {
                        imgPopup.style.display = "none";
                    }, helperTime);
                }

                // --- Test Mode ---
                function testFormatTime(s) {
                    const m = Math.floor(s / 60);
                    const ss = s % 60;
                    return (
                        (m > 0 ? m + ":" : "") +
                        (m > 0 ? String(ss).padStart(2, "0") : ss) +
                        "s"
                    );
                }

                function testStartTimer() {
                    if (testTimerRunning) return;
                    testTimerRunning = true;
                    testTimerInterval = setInterval(() => {
                        testTimerSeconds++;
                        testRenderTimer();
                    }, 1000);
                }

                function testStopTimer() {
                    testTimerRunning = false;
                    clearInterval(testTimerInterval);
                    testTimerInterval = null;
                }

                function testRenderTimer() {
                    if (!testMode) return;
                    const el = document.getElementById("testTimer");
                    const hiddenEl = document.getElementById("testTimerHidden");
                    if (testShowTimer) {
                        el.style.display = "block";
                        el.textContent = testFormatTime(testTimerSeconds);
                        hiddenEl.style.display = "none";
                    } else {
                        el.style.display = "none";
                        hiddenEl.style.display = "block";
                    }
                }

                function testUpdateSubmitBtn() {
                    // Submit always visible in test mode (disabled visually if nothing typed), hidden in normal
                    const btn = document.getElementById("testSubmitBtn");
                    btn.style.display = testMode ? "inline-block" : "none";
                    btn.style.opacity =
                        testMode && currentInputLength > 0 && !testSubmitted
                            ? "1"
                            : "0.4";
                    btn.style.pointerEvents =
                        testMode && currentInputLength > 0 && !testSubmitted
                            ? "auto"
                            : "none";
                }

                // Helper: get person/object image srcs for a group at absPos
                function testGetGroupImages(absPos, mode) {
                    const d = getPAOGroupDataByPos(absPos, mode);
                    if (!d) return { pSrc: null, oSrc: null, d: null };
                    const pEntry = lookupAnkiEntry(d.pNum);
                    const oEntry = lookupAnkiEntry(d.oNum);
                    return {
                        pSrc: pEntry ? getImgSrc(pEntry.personSrc) : null,
                        oSrc: oEntry ? getImgSrc(oEntry.objectSrc) : null,
                        d,
                    };
                }

                function testSubmit() {
                    if (testSubmitted) return;
                    testSubmitted = true;
                    testStopTimer();
                    testUpdateSubmitBtn();

                    const val = piInput.value.replace(/\D/g, "");
                    const totalTyped = val.length;

                    // Walk through val aligning to pi groups, detecting skips via lookahead
                    // valOffset = current read position in val
                    // piOffset  = current position in pi (relative to sequenceStartIndex)
                    let valOffset = 0;
                    let piOffset = 0;

                    // Each entry: { type: "ok"|"wrong"|"skip", absPos, typed?, correct, digitHtml? }
                    const segments = [];

                    while (valOffset < totalTyped) {
                        const absPos = sequenceStartIndex + piOffset;
                        const mode = getModeForPos(absPos + 1);
                        const gSize = getGroupSizeForMode(mode);
                        const correct = PI_DIGITS.substr(absPos, gSize);
                        const remaining = totalTyped - valOffset;

                        if (remaining <= 0) break;

                        // Full group available?
                        if (remaining >= gSize) {
                            const typed = val.substring(
                                valOffset,
                                valOffset + gSize,
                            );

                            if (typed === correct) {
                                segments.push({
                                    type: "ok",
                                    absPos,
                                    typed,
                                    correct,
                                    gSize,
                                });
                                valOffset += gSize;
                                piOffset += gSize;
                            } else {
                                // Skip detection: does `typed` match the NEXT group's correct digits?
                                const nextAbsPos = absPos + gSize;
                                const nextMode = getModeForPos(nextAbsPos + 1);
                                const nextGSize = getGroupSizeForMode(nextMode);
                                const nextCorrect = PI_DIGITS.substr(
                                    nextAbsPos,
                                    nextGSize,
                                );
                                if (
                                    remaining >= nextGSize &&
                                    typed === nextCorrect
                                ) {
                                    // This group was skipped — insert missing group, don't consume val
                                    segments.push({
                                        type: "skip",
                                        absPos,
                                        correct,
                                        gSize,
                                    });
                                    piOffset += gSize; // advance pi past the skipped group
                                    // Don't advance valOffset — the typed digits belong to next group
                                } else {
                                    segments.push({
                                        type: "wrong",
                                        absPos,
                                        typed,
                                        correct,
                                        gSize,
                                    });
                                    valOffset += gSize;
                                    piOffset += gSize;
                                }
                            }
                        } else {
                            // Partial last group
                            const typed = val.substring(valOffset);
                            segments.push({
                                type: "partial",
                                absPos,
                                typed,
                                correct,
                                gSize,
                            });
                            valOffset += remaining;
                            piOffset += gSize;
                        }
                    }

                    // Build HTML and collect hover targets
                    let html = "";
                    let mistakeCount = 0,
                        skipCount = 0,
                        correctCount = 0;
                    const hoverTargets = []; // {id, absPos, mode}

                    segments.forEach((seg, si) => {
                        const segMode = getModeForPos(seg.absPos + 1);
                        const id = `tsg-${si}`;

                        if (seg.type === "ok") {
                            html += `<span class="digit-group"><span id="${id}" class="correct" style="cursor:pointer;">${seg.typed}</span></span>`;
                            correctCount += seg.gSize;
                            hoverTargets.push({
                                id,
                                absPos: seg.absPos,
                                mode: segMode,
                            });
                        } else if (seg.type === "skip") {
                            html += `<span class="digit-group"><span id="${id}" class="incorrect" style="opacity:0.45;cursor:pointer;">${seg.correct}</span></span>`;
                            skipCount++;
                            mistakeCount++;
                            hoverTargets.push({
                                id,
                                absPos: seg.absPos,
                                mode: segMode,
                            });
                        } else if (
                            seg.type === "wrong" ||
                            seg.type === "partial"
                        ) {
                            let digitHtml = "";
                            let anyWrong = false;
                            for (let i = 0; i < seg.typed.length; i++) {
                                if (seg.typed[i] === seg.correct[i]) {
                                    digitHtml += `<span style="color:var(--highlight-correct);">${seg.typed[i]}</span>`;
                                    correctCount++;
                                } else {
                                    digitHtml += `<span style="color:var(--highlight-incorrect);">${seg.typed[i]}</span>`;
                                    anyWrong = true;
                                }
                            }
                            html += `<span class="digit-group"><span id="${id}" style="cursor:pointer;">${digitHtml}</span></span>`;
                            if (anyWrong) mistakeCount++;
                            hoverTargets.push({
                                id,
                                absPos: seg.absPos,
                                mode: segMode,
                            });
                        }
                    });

                    outputDiv.innerHTML = html;
                    outputDiv.classList.toggle(
                        "mode-323",
                        currentPAOMode === "323",
                    );
                    outputContainer.scrollTop = outputContainer.scrollHeight;
                    outputDiv.scrollLeft = outputDiv.scrollWidth;

                    // Wire dual-image hover on ALL groups (including correct)
                    hoverTargets.forEach(({ id, absPos, mode }) => {
                        const el = document.getElementById(id);
                        if (!el) return;
                        const { pSrc, oSrc, d } = testGetGroupImages(
                            absPos,
                            mode,
                        );
                        if (!pSrc && !oSrc) return;
                        const label = d
                            ? `${d.pTerm} / ${d.aTerm} / ${d.oTerm}`
                            : "";
                        const nums = d
                            ? `${d.pNum} / ${d.aNum} / ${d.oNum}`
                            : "";
                        attachHoverDualImage(el, pSrc, oSrc, label, nums);
                    });

                    saveSettings();

                    const timeStr = testFormatTime(testTimerSeconds);
                    const accuracy =
                        totalTyped > 0
                            ? Math.round((correctCount / totalTyped) * 100)
                            : 0;
                    const resultEl = document.getElementById("testResultMsg");
                    if (mistakeCount === 0) {
                        resultEl.style.color = "var(--highlight-correct)";
                        resultEl.textContent = `✓ Perfect! ${totalTyped} digits in ${timeStr}`;
                    } else {
                        resultEl.style.color = "var(--highlight-incorrect)";
                        const skipNote =
                            skipCount > 0 ? ` (${skipCount} skipped)` : "";
                        resultEl.textContent = `${mistakeCount} mistake${mistakeCount > 1 ? "s" : ""}${skipNote} · ${accuracy}% · ${timeStr}`;
                    }

                    document.getElementById("testSecondRow").style.display =
                        "flex";
                    document.getElementById("testContinueBtn").style.display =
                        "inline-block";
                }

                function testReset() {
                    testSubmitted = false;
                    testTimerSeconds = 0;
                    testTimerRunning = false;
                    clearInterval(testTimerInterval);
                    testTimerInterval = null;
                    document.getElementById("testResultMsg").textContent = "";
                    document.getElementById("testContinueBtn").style.display =
                        "none";
                    document.getElementById("testSecondRow").style.display =
                        "none";
                    piInput.value = "";
                    outputDiv.innerHTML = "";
                    document.getElementById("position").innerHTML = "";
                    currentInputLength = 0;
                    testRenderTimer();
                    testUpdateSubmitBtn();
                    piInput.focus();
                    saveSettings();
                }

                function testSetMode(on) {
                    testMode = on;
                    document
                        .getElementById("testModeToggle")
                        .classList.toggle("active", on);
                    // Normal-mode-only elements
                    document.getElementById("viewImagesButton").style.display =
                        on ? "none" : "inline-block";
                    document.getElementById("normalSecondRow").style.display =
                        on ? "none" : "flex";
                    // Test-mode result
                    document.getElementById("testResultMsg").style.display = on
                        ? "block"
                        : "none";
                    testUpdateSubmitBtn();
                    if (on) {
                        // Save current input before entering test mode
                        testSetMode._savedInput = piInput.value;
                        testSetMode._savedSeqStart = sequenceStartIndex;
                        testReset();
                    } else {
                        testStopTimer();
                        document.getElementById("testResultMsg").textContent =
                            "";
                        document.getElementById(
                            "testContinueBtn",
                        ).style.display = "none";
                        document.getElementById("testSecondRow").style.display =
                            "none";
                        document.getElementById("testTimer").style.display =
                            "none";
                        document.getElementById(
                            "testTimerHidden",
                        ).style.display = "none";
                        // Restore pre-test input
                        const saved = testSetMode._savedInput || "";
                        sequenceStartIndex = testSetMode._savedSeqStart || 0;
                        piInput.value = saved;
                        if (saved) {
                            checkPiDigits(piInput);
                        } else {
                            outputDiv.innerHTML = "";
                            document.getElementById("position").innerHTML = "";
                            currentInputLength = 0;
                        }
                        saveSettings();
                    }
                    saveSettings();
                }

                // --- List View ---
                function displayList(scrollToCurrent = false) {
                    imagesListDiv.innerHTML = "";
                    let found = false;
                    let groupNum = 0;
                    let pos = 0;
                    const fragment = document.createDocumentFragment();
                    while (pos < PI_DIGITS.length) {
                        const mode = getModeForPos(pos + 1);
                        const gSize = getGroupSizeForMode(mode);
                        if (pos + gSize > PI_DIGITS.length) break;
                        found = true;
                        const isCurrent = pos === practiceIndex;
                        const isDue = srsIsDue(pos);
                        const d = getPAOGroupDataByPos(pos, mode);
                        const row = document.createElement("div");
                        row.className =
                            "image-line" +
                            (isCurrent ? " current-row" : "") +
                            (isDue ? " srs-due-row" : "");
                        row.dataset.pos = pos;
                        row.innerHTML = `
                            <span class="line-number">${d.pos + 1}</span>
                            <div class="line-content">
                                <div class="list-segment"><span class="list-term">${d.pTerm}</span><span class="list-num">${d.pNum}</span></div>
                                <div class="list-segment"><span class="list-term">${d.aTerm}</span><span class="list-num">${d.aNum}</span></div>
                                <div class="list-segment"><span class="list-term">${d.oTerm}</span><span class="list-num">${d.oNum}</span></div>
                            </div>
                            <span style="min-width:24px;display:inline-block;"></span>
                        `;
                        row.onclick = ((capturedPos) => () => {
                            imagesModal.style.display = "none";
                            openFlashcards(capturedPos);
                        })(pos);
                        fragment.appendChild(row);
                        pos += gSize;
                        groupNum++;
                    }
                    imagesListDiv.appendChild(fragment);
                    if (!found)
                        imagesListDiv.innerHTML += `<p style="text-align:center;color:#888">No items found.</p>`;
                    if (scrollToCurrent) {
                        requestAnimationFrame(() => {
                            const row = imagesListDiv.querySelector(
                                `[data-pos="${practiceIndex}"]`,
                            );
                            if (row) row.scrollIntoView({ block: "center" });
                        });
                    }
                }

                // --- Flashcards ---
                function openFlashcards(startIndex) {
                    practiceModal.style.display = "block";
                    if (startIndex !== undefined) {
                        practiceIndex = startIndex;
                        saveSettings();
                    }
                    // Clear browse-modal undo/redo so they don't leak
                    // between sessions.
                    browseRateHistory = [];
                    browseRateRedo = [];
                    // Restore review-mode state from settings and apply
                    // the relevant UI (hide nav, disable seek, etc.).
                    applyReviewModeUI();
                    renderPracticeCard();
                }

                // Apply/hide the review-mode UI inside the browse modal.
                // In IIFE scope (not init()) so openFlashcards can call it.
                function applyReviewModeUI() {
                    // Prev/next buttons: keep their space in the flex layout
                    // by using visibility + zero dimensions instead of
                    // display:none, so the position/image inputs don't shift.
                    const _prev = document.getElementById("practicePrevBtn");
                    const _next = document.getElementById("practiceNextBtn");
                    if (_prev)
                        _prev.style.cssText = isReviewMode
                            ? "visibility:hidden;width:0;padding:0;border:0;min-width:0;overflow:hidden"
                            : "";
                    if (_next)
                        _next.style.cssText = isReviewMode
                            ? "visibility:hidden;width:0;padding:0;border:0;min-width:0;overflow:hidden"
                            : "";
                    // Seek inputs: disabled in review mode.
                    if (practiceSeekPos)
                        practiceSeekPos.disabled = isReviewMode;
                    if (practiceSeekImg)
                        practiceSeekImg.disabled = isReviewMode;
                    // Sync the checkbox toggle with the current state.
                    const _cb = document.getElementById("reviewModeToggle");
                    if (_cb) _cb.checked = isReviewMode;
                }

                function lookupAnkiEntry(num) {
                    const numStr = num.toString();
                    const num2 = numStr.padStart(2, "0");
                    const num3 = numStr.padStart(3, "0");
                    // 2-digit key → Century PAO only. Never fall through to
                    // millennium (ankiImages) — that would show 014's image
                    // for position 14 when only the millennium txt is loaded.
                    if (numStr.length <= 2) {
                        return ankiImages2[num2] || ankiImages2[numStr] || null;
                    }
                    // 3-digit key → Millennium PAO only.
                    return ankiImages[num3] || ankiImages[numStr] || null;
                }

                function updateCardWithImages(d) {
                    const pos = d.pos;
                    const mode = getModeForPos(pos + 1);

                    // Person
                    const pEntry = lookupAnkiEntry(d.pNum);
                    const pSrc = pEntry ? getImgSrc(pEntry.personSrc) : null;
                    pracPerson.textContent = d.pTerm;
                    pracPerson.classList.remove("has-image");
                    const pracPersonImg =
                        document.getElementById("pracPersonImg");
                    if (pracPersonImg) {
                        if (pSrc) {
                            pracPersonImg.src = pSrc;
                            pracPersonImg.style.display = "block";
                        } else {
                            pracPersonImg.src = "";
                            pracPersonImg.style.display = "none";
                        }
                    }

                    // Action — no images
                    pracAction.textContent = d.aTerm;
                    pracAction.classList.remove("has-image");

                    // Object
                    const oEntry = lookupAnkiEntry(d.oNum);
                    const oSrc = oEntry ? getImgSrc(oEntry.objectSrc) : null;
                    pracObject.textContent = d.oTerm;
                    pracObject.classList.remove("has-image");
                    const pracObjectImg =
                        document.getElementById("pracObjectImg");
                    if (pracObjectImg) {
                        if (oSrc) {
                            pracObjectImg.src = oSrc;
                            pracObjectImg.style.display = "block";
                        } else {
                            pracObjectImg.src = "";
                            pracObjectImg.style.display = "none";
                        }
                    }
                }

                // Count how many groups are before pos (for image # display)
                function posToGroupNum(targetPos) {
                    let count = 0,
                        p = 0;
                    while (p < targetPos && p < PI_DIGITS.length) {
                        const m = getModeForPos(p + 1);
                        p += getGroupSizeForMode(m);
                        count++;
                    }
                    return count;
                }
                // Advance pos to start of next group boundary given a raw pos
                function snapToGroupStart(rawPos) {
                    if (rawPos <= 0) return 0;
                    let p = 0,
                        lastValid = 0;
                    while (p < PI_DIGITS.length) {
                        const m = getModeForPos(p + 1);
                        const gs = getGroupSizeForMode(m);
                        if (p + gs > PI_DIGITS.length) break; // incomplete group
                        if (p + gs > rawPos) return p; // rawPos lands inside this group
                        lastValid = p;
                        if (p + gs === rawPos) return p + gs; // rawPos is exactly next boundary
                        p += gs;
                    }
                    return lastValid; // rawPos is past end — clamp to last valid group
                }

                function renderPracticeCard() {
                    const pos = practiceIndex; // practiceIndex IS the abs digit pos
                    const mode = getModeForPos(pos + 1);
                    const d = getPAOGroupDataByPos(pos, mode);
                    if (!d) return;

                    pracPersonNum.textContent = d.pNum;
                    pracActionNum.textContent = d.aNum;
                    pracObjectNum.textContent = d.oNum;
                    updateCardWithImages(d);

                    practiceSeekImg.value = posToGroupNum(pos) + 1;
                    practiceSeekPos.value = pos + 1;
                }

                function handleNav(dir) {
                    {
                        const mode = getModeForPos(practiceIndex + 1);
                        const gSize = getGroupSizeForMode(mode);
                        let newPos = practiceIndex + dir * gSize;
                        // Hard clamp — no wrapping
                        if (newPos < 0) newPos = 0;
                        else newPos = snapToGroupStart(newPos); // clamps to last valid group if past end
                        practiceIndex = newPos;
                        saveSettings();
                        renderPracticeCard();
                    }
                }

                // ═══════════════════════════════════════════
                // SRS ENGINE (SM-2 variant)
                // ═══════════════════════════════════════════

                // "Today" = calendar day that started at 4am local time
                // ═══════════════════════════════════════════
                // DAILY GOAL / STREAK / STATS
                // ═══════════════════════════════════════════

                function statsAddDays(dateKey, n) {
                    const d = new Date(dateKey + "T00:00:00");
                    d.setDate(d.getDate() + n);
                    const y = d.getFullYear(),
                        m = String(d.getMonth() + 1).padStart(2, "0"),
                        dd = String(d.getDate()).padStart(2, "0");
                    return `${y}-${m}-${dd}`;
                }

                // Credit newly-typed CORRECT digits to today's total, exactly once each.
                // dailyCreditedMaxLength is a high-water mark that only ever grows for a
                // given sequenceStartIndex: it remembers how far the user has *ever* typed
                // correctly in this sequence today, so backspacing and retyping the same
                // digits does not re-credit them. Only digits beyond that max are new.
                //
                // A short typed prefix (e.g. a single "5") is ambiguous and may match the
                // FIRST place that digit happens to occur in pi, getting opportunistically
                // credited — but once more digits are typed and reveal the user actually
                // meant a different occurrence, sequenceStartIndex jumps elsewhere. In that
                // case we revoke the old position's provisional credit (dailyCreditedAmount)
                // so a false start never permanently inflates the daily count.
                function creditDailyDigits(val) {
                    const today = srsToday();
                    // If the date changed, reset all credit state (typed digits from yesterday
                    // should not count toward today's goal).
                    if (dailyCreditedDate !== today) {
                        dailyCreditedSeqStart = sequenceStartIndex;
                        dailyCreditedMaxLength = val.length; // skip crediting existing digits
                        dailyCreditedAmount = 0;
                        dailyCreditedDate = today;
                        // Reset today's count to 0 so the display doesn't
                        // continue showing yesterday's number. Refresh
                        // the goal bar / stats display immediately.
                        dailyStats[today] = 0;
                        if (typeof updateGoalBarOnly === "function")
                            updateGoalBarOnly();
                    }
                    if (sequenceStartIndex !== dailyCreditedSeqStart) {
                        // Moving to a different position: undo whatever was provisionally
                        // credited under the old position before starting fresh here.
                        if (dailyCreditedAmount > 0) {
                            dailyStats[today] = Math.max(
                                0,
                                (dailyStats[today] || 0) - dailyCreditedAmount,
                            );
                        }
                        dailyCreditedSeqStart = sequenceStartIndex;
                        dailyCreditedMaxLength = 0;
                        dailyCreditedAmount = 0;
                    }
                    if (val.length > dailyCreditedMaxLength) {
                        let newCorrect = 0;
                        for (
                            let i = dailyCreditedMaxLength;
                            i < val.length;
                            i++
                        ) {
                            if (val[i] === PI_DIGITS[sequenceStartIndex + i])
                                newCorrect++;
                        }
                        if (newCorrect > 0) {
                            dailyStats[today] =
                                (dailyStats[today] || 0) + newCorrect;
                            dailyCreditedAmount += newCorrect;
                        }
                        dailyCreditedMaxLength = val.length;
                    }
                    // val.length <= dailyCreditedMaxLength (i.e. backspaced within already-
                    // credited territory): nothing to do. The max stays put so retyping the
                    // same ground doesn't get credited a second time.
                }

                function computeCurrentStreak() {
                    let streak = 0;
                    let dateKey = srsToday();
                    let first = true;
                    let safety = 0;
                    while (safety++ < 3650) {
                        const count = dailyStats[dateKey] || 0;
                        if (count >= dailyGoal) {
                            streak++;
                        } else if (!first) {
                            break;
                        }
                        first = false;
                        dateKey = statsAddDays(dateKey, -1);
                    }
                    return streak;
                }

                function computeLongestStreak() {
                    const dates = Object.keys(dailyStats)
                        .filter((k) => dailyStats[k] >= dailyGoal)
                        .sort();
                    let longest = 0,
                        current = 0,
                        prevKey = null;
                    for (const key of dates) {
                        if (prevKey && statsAddDays(prevKey, 1) === key)
                            current++;
                        else current = 1;
                        longest = Math.max(longest, current);
                        prevKey = key;
                    }
                    return longest;
                }

                function computeBestDay() {
                    let best = 0,
                        bestDate = "";
                    for (const [k, v] of Object.entries(dailyStats)) {
                        if (v > best) {
                            best = v;
                            bestDate = k;
                        }
                    }
                    return { best, bestDate };
                }

                // Average digits/day across days that have ANY recorded activity
                // (mirrors Anki's "daily average" which only counts studied days, not zero days).
                function computeDailyAverage() {
                    const counts = Object.values(dailyStats).filter(
                        (v) => v > 0,
                    );
                    if (!counts.length) return 0;
                    const total = counts.reduce((a, b) => a + b, 0);
                    return Math.round(total / counts.length);
                }

                // % of days since the first recorded day that have any activity at all
                // (mirrors Anki's "days learned" stat).
                function computeDaysLearnedPct() {
                    const keys = Object.keys(dailyStats)
                        .filter((k) => dailyStats[k] > 0)
                        .sort();
                    if (!keys.length) return 0;
                    const first = new Date(keys[0] + "T00:00:00");
                    const today = new Date(srsToday() + "T00:00:00");
                    const totalDays = Math.max(
                        1,
                        Math.round((today - first) / 86400000) + 1,
                    );
                    return Math.round((keys.length / totalDays) * 100);
                }

                // ── Heatmap color helpers ──
                // Computes the 5 heatmap levels (0=empty, 1-4=lightest→darkest) from the
                // currently-selected scheme. Empty cell (idx=0) is mode-aware: light grey
                // in light mode, dark grey in dark mode (matches --stats-heat-0).
                function _heatColor(idx) {
                    if (idx === 0) {
                        const isDark =
                            document.body.classList.contains("dark-mode");
                        return isDark ? "#222222" : "#EAEAEA";
                    }
                    const scheme = HEATMAP_SCHEMES[heatmapScheme] ||
                        HEATMAP_SCHEMES.ice;
                    // Map idx 1..4 → t = (idx-1)/3
                    const t = (idx - 1) / 3;
                    return pcLerpColor(scheme.light, scheme.dark, t);
                }

                // ── Tooltip helpers ──
                function _showTooltip(e, html) {
                    const tip = document.getElementById("heatmapTooltip");
                    if (!tip) return;
                    tip.innerHTML = html;
                    tip.style.display = "block";
                    tip.style.whiteSpace = "pre-line";
                    const rect = e.target.getBoundingClientRect();
                    tip.style.left = Math.max(4, Math.min(window.innerWidth - tip.offsetWidth - 4, rect.left + rect.width / 2 - tip.offsetWidth / 2)) + "px";
                    tip.style.top = (rect.top - tip.offsetHeight - 6) + "px";
                }
                function _hideTooltip() {
                    const tip = document.getElementById("heatmapTooltip");
                    if (tip) tip.style.display = "none";
                }

                function renderHeatmap() {
                    const container = document.getElementById("statsHeatmap");
                    if (!container) return;
                    container.innerHTML = "";

                    const todayStr = srsToday();
                    const today = new Date(todayStr + "T00:00:00");
                    const year = heatmapViewYear;
                    const yearStart = new Date(year, 0, 1);
                    const yearEnd = new Date(year, 11, 31);

                    // Align to Monday (1=Mon, 0=Sun→6)
                    const startDow = yearStart.getDay();
                    const startOffset = (startDow + 6) % 7;
                    const gridStart = new Date(yearStart);
                    gridStart.setDate(gridStart.getDate() - startOffset);

                    // Align end to Sunday
                    const endDow = yearEnd.getDay();
                    const endOffset = (7 - endDow) % 7;
                    const gridEnd = new Date(yearEnd);
                    gridEnd.setDate(gridEnd.getDate() + endOffset);

                    const totalDays = Math.round((gridEnd - gridStart) / 86400000) + 1;

                    const grid = document.createElement("div");
                    grid.style.cssText =
                        "display:grid;grid-auto-flow:column;grid-template-rows:repeat(7,1fr);gap:2px;width:max-content;";

                    // Project future-due card counts for each day in the
                    // current year, matching Anki's heatmap behaviour:
                    //   * Today's "backlog" (overdue + due-today review cards)
                    //     is reduced by the user's daily review limit each day
                    //     going forward, floored at zero.
                    //   * Already-scheduled future cards are added on top.
                    //   * Learning cards (reviews === 0) are excluded from the
                    //     backlog — they're limited by newPerDay, not maxReviews.
                    const _cfg = srsGetSettings();
                    const _dailyReviewRate = _cfg.maxReviews || 200;
                    const _backlog = Object.values(srsData).filter(
                        (c) => c.reviews > 0 && c.dueDate <= todayStr,
                    ).length;
                    // Already-scheduled future cards (current behaviour).
                    const _alreadyScheduled = {};
                    for (const posStr in srsData) {
                        const card = srsData[posStr];
                        if (card.dueDate > todayStr) {
                            _alreadyScheduled[card.dueDate] =
                                (_alreadyScheduled[card.dueDate] || 0) + 1;
                        }
                    }
                    const futureDueByDate = {};
                    let maxFutureDue = 0;
                    const _startDate = new Date(todayStr + "T00:00:00");
                    const _cursor = new Date(_startDate);
                    _cursor.setDate(_cursor.getDate() + 1); // start at tomorrow
                    while (_cursor <= gridEnd) {
                        const _dateStr =
                            _cursor.getFullYear() +
                            "-" +
                            String(_cursor.getMonth() + 1).padStart(2, "0") +
                            "-" +
                            String(_cursor.getDate()).padStart(2, "0");
                        const _daysPassed = Math.round(
                            (_cursor - _startDate) / 86400000,
                        );
                        const _backlogRemaining = Math.max(
                            0,
                            _backlog - _daysPassed * _dailyReviewRate,
                        );
                        const _scheduledForDay = _alreadyScheduled[_dateStr] || 0;
                        const _totalDue = _backlogRemaining + _scheduledForDay;
                        if (_totalDue > 0) {
                            futureDueByDate[_dateStr] = _totalDue;
                            if (_totalDue > maxFutureDue) maxFutureDue = _totalDue;
                        }
                        _cursor.setDate(_cursor.getDate() + 1);
                    }
                    if (maxFutureDue === 0) maxFutureDue = 1;

                    // Color interpolation helper
                    function lerpColor(a, b, t) {
                        const ar = parseInt(a.slice(1, 3), 16), ag = parseInt(a.slice(3, 5), 16), ab = parseInt(a.slice(5, 7), 16);
                        const br = parseInt(b.slice(1, 3), 16), bg = parseInt(b.slice(3, 5), 16), bb = parseInt(b.slice(5, 7), 16);
                        const rr = Math.round(ar + (br - ar) * t);
                        const rg = Math.round(ag + (bg - ag) * t);
                        const rb = Math.round(ab + (bb - ab) * t);
                        return `rgb(${rr},${rg},${rb})`;
                    }

                    // Check if dark mode is active
                    const isDark = document.body.classList.contains("dark-mode");

                    // Past-data gradient is driven by the user-selected heatmapScheme.
                    // Future-date cells are mode-aware grays (these don't represent data).
                    const _scheme = HEATMAP_SCHEMES[heatmapScheme] ||
                        HEATMAP_SCHEMES.ice;
                    const pastDark = _scheme.dark;
                    const pastLight = _scheme.light;
                    const futureDark = isDark ? "#313232" : "#D9D9D9";
                    const futureLight = isDark ? "#494B4B" : "#8E8E8E";
                    const emptyColor = isDark ? "#222222" : "#EAEAEA";

                    // Find max daily stats for normalization
                    const maxDaily = Math.max(1, ...Object.values(dailyStats));
                    const maxReviews = Math.max(1, ...Object.values(dailyReviewStats));

                    let cursor = new Date(gridStart);
                    for (let i = 0; i < totalDays; i++) {
                        const cy = cursor.getFullYear();
                        const cm = String(cursor.getMonth() + 1).padStart(2, "0");
                        const cd = String(cursor.getDate()).padStart(2, "0");
                        const key = `${cy}-${cm}-${cd}`;
                        const cell = document.createElement("div");
                        cell.style.cssText = "width:12px;height:12px;cursor:pointer;";

                        const isFuture = cursor > today;
                        const isToday = key === todayStr;
                        const inYear = cy === year;

                        if (!inYear) {
                            cell.style.background = "transparent";
                            cell.style.cursor = "default";
                        } else if (isFuture) {
                            // For "digits" mode, future squares show empty
                            if (heatmapMode === "digits") {
                                cell.style.background = emptyColor;
                            } else {
                                const dueCount = futureDueByDate[key] || 0;
                                if (dueCount === 0) {
                                    cell.style.background = emptyColor;
                                } else {
                                    const frac = Math.min(1, dueCount / maxFutureDue);
                                    cell.style.background = lerpColor(futureDark, futureLight, frac);
                                }
                                const dateStr = cursor.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
                                if (dueCount > 0) {
                                    cell.addEventListener("mouseenter", (e) => _showTooltip(e, `<b>${dueCount}</b> card${dueCount === 1 ? "" : "s"} due<br>${dateStr}`));
                                    cell.addEventListener("mouseleave", _hideTooltip);
                                } else {
                                    cell.addEventListener("mouseenter", (e) => _showTooltip(e, `<b>No</b> cards due<br>${dateStr}`));
                                    cell.addEventListener("mouseleave", _hideTooltip);
                                }
                            }
                        } else {
                            const digitCount = dailyStats[key] || 0;
                            const reviewCount = dailyReviewStats[key] || 0;

                            // Smooth gradient for digits: 0 = empty, goal = lightest
                            const dFrac = digitCount === 0 ? 0 : Math.min(1, digitCount / dailyGoal);
                            const dColor = digitCount === 0 ? emptyColor : lerpColor(pastDark, pastLight, dFrac);

                            // Smooth gradient for reviews: normalize against max reviews
                            const rFrac = reviewCount === 0 ? 0 : Math.min(1, reviewCount / maxReviews);
                            const rColor = reviewCount === 0 ? emptyColor : lerpColor(pastDark, pastLight, rFrac);

                            // Apply coloring based on mode
                            if (heatmapMode === "digits") {
                                cell.style.background = dColor;
                            } else if (heatmapMode === "cards") {
                                cell.style.background = rColor;
                            } else {
                                // "both" - diagonal split
                                cell.style.background = `linear-gradient(135deg, ${dColor} 50%, ${rColor} 50%)`;
                            }

                            if (isToday) {
                                cell.style.border = "1.5px solid var(--stats-text)";
                                cell.style.boxSizing = "border-box";
                            }

                            const dateStr = cursor.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
                            const tipHtml = `<b>${digitCount}</b> digit${digitCount === 1 ? "" : "s"} typed<br><b>${reviewCount}</b> card${reviewCount === 1 ? "" : "s"} reviewed<br>${dateStr}`;
                            cell.addEventListener("mouseenter", (e) => _showTooltip(e, tipHtml));
                            cell.addEventListener("mouseleave", _hideTooltip);
                        }

                        grid.appendChild(cell);
                        cursor.setDate(cursor.getDate() + 1);
                    }
                    container.appendChild(grid);

                    const yearEl = document.getElementById("heatmapYear");
                    if (yearEl) yearEl.textContent = year;
                }

                function renderReviewHeatmap() {
                    // No longer rendered separately — merged into renderHeatmap
                }

                function renderPiCoverage() {
                    const container =
                        document.getElementById("statsPiCoverage");
                    if (!container) return;
                    container.innerHTML = "";

                    const today = srsToday();
                    const isDark = document.body.classList.contains("dark-mode");

                    // Pi coverage color scheme: driven by the user-selected heatmapScheme
                    const _scheme = HEATMAP_SCHEMES[heatmapScheme] ||
                        HEATMAP_SCHEMES.ice;
                    const pcLight = _scheme.light;
                    const pcDark = _scheme.dark;
                    // Empty cell is mode-aware: #EAEAEA in light mode, #222222 in dark mode
                    const pcEmpty = isDark ? "#222222" : "#EAEAEA";

                    // Stats counters (counted in both modes, shown always)
                    let pcStatsOverdue = 0;
                    let pcStatsNotAdded = 0;
                    let pcStatsTotal = 0;

                    // Find the max card position (furthest card in SRS deck)
                    const srsPositions = Object.keys(srsData).map(Number);
                    const maxCardPos = srsPositions.length > 0 ? Math.max(...srsPositions) : 0;
                    // Pi coverage shows squares for actual cards only (plus a
                    // 300-square floor for first-time users). We do NOT extend
                    // the grid based on how far the user has typed — the
                    // grid stays stable so users can see their review range
                    // at a glance.
                    const maxPos = Math.max(maxCardPos, 300);

                    let p = 0;
                    while (p < maxPos && p < PI_DIGITS.length) {
                        const cellPos = p; // capture current position for closures
                        const mode = getModeForPos(p + 1);
                        const gs = getGroupSizeForMode(mode);
                        if (p + gs > PI_DIGITS.length) break;

                        const card = srsData[p];
                        const cell = document.createElement("div");
                        cell.className = "pi-cov-cell";

                        // Get PAO data for tooltip (works for all positions)
                        const d = getPAOGroupDataByPos(p, mode);
                        const groupNum = Math.floor(p / gs) + 1;

                        // Card states:
                        //   - no card            → not added to deck (never typed/marked)
                        //   - learning state     → added to deck (srsAddCard or A/H/Auto-mistake
                        //                          on a new chunk) but not yet graduated; not in
                        //                          the review deck yet — renders empty
                        //   - in review deck     → graduated: interval > 0 and step < 0/undefined
                        // The first two are visually identical (empty cell) and grouped under
                        // "Not Added" in the stats counters. The third gets a color.
                        const cardInReviewDeck = card &&
                            card.interval > 0 &&
                            (card.step === undefined || card.step < 0);
                        const cardIsLearning = card && !cardInReviewDeck;
                        const _cellIsNotAdded = !card;

                        // Compute color based on mode, and count stats
                        let daysUntilDue = 0;
                        let dueDateStr = "";
                            if (!card) {
                            // No card, or added but not yet in the review deck
                            // — render empty and don't compute due stats.
                            cell.style.background = pcEmpty;
                        } else {
                            const dueMs = new Date(card.dueDate + "T00:00:00").getTime();
                            const todayMs = new Date(today + "T00:00:00").getTime();
                            daysUntilDue = Math.round((dueMs - todayMs) / 86400000);
                            dueDateStr = card.dueDate;

                            if (piCoverageMode === "ease") {
                                // Color by ease factor: 1.3 (hardest) → 4.0 (easiest)
                                // ease 1.3 = darkest (hard), ease 4.0 = lightest (easy)
                                const ease = card.easeFactor || 2.5;
                                const t = Math.max(0, Math.min(1, (ease - 1.3) / (4.0 - 1.3)));
                                cell.style.background = pcLerpColor(pcDark, pcLight, t);
                            } else {
                                // "due" mode
                                if (daysUntilDue < 0) {
                                    // Overdue: scheme-aware solid color
                                    cell.style.background = _scheme.overdue;
                                } else {
                                    // daysUntilDue >= 0: interpolate (0 = darkest, 30+ = lightest)
                                    const t = Math.max(0, Math.min(1, 1 - daysUntilDue / 30));
                                    cell.style.background = pcLerpColor(pcLight, pcDark, t);
                                }
                            }
                        }
                        // Count stats AFTER daysUntilDue is known
                        pcStatsTotal++;
                        if (_cellIsNotAdded) {
                            pcStatsNotAdded++;
                        } else if (daysUntilDue < 0) {
                            pcStatsOverdue++;
                        }

                        // Build hover popup with images (like test mode)
                        if (d) {
                            const pEntry = lookupAnkiEntry(d.pNum);
                            const oEntry = lookupAnkiEntry(d.oNum);
                            const pSrc = pEntry ? getImgSrc(pEntry.personSrc) : null;
                            const oSrc = oEntry ? getImgSrc(oEntry.objectSrc) : null;
                            const label = `${d.pTerm} / ${d.aTerm} / ${d.oTerm}`;
                            const digits = `${d.pNum} / ${d.aNum} / ${d.oNum}`;

                            // Build header with due date distance.
                            // All empty cells (#222222 — no card, or card
                            // in learning state) get no due-info line.
                            // The "NOT ADDED" label was removed because
                            // typed-but-not-added chunks and never-typed
                            // chunks now look the same: both are just
                            // "not in your review deck."
                            let dueInfo = "";
                        if (!card) {
                                dueInfo = "";
                            } else if (daysUntilDue < 0) {
                                const overdue = Math.abs(daysUntilDue);
                                dueInfo = ` · OVERDUE ${overdue} DAY${overdue !== 1 ? "S" : ""}`;
                            } else if (daysUntilDue === 0) {
                                dueInfo = " · DUE TODAY";
                            } else {
                                dueInfo = ` · DUE IN ${daysUntilDue} DAY${daysUntilDue !== 1 ? "S" : ""}`;
                            }
                            const header = `Image #${groupNum} · Position #${p + 1}${dueInfo}`;

                            cell._hoverEnter = (e) => {
                                const popup = document.getElementById("imgPopup");
                                const popupHeader = document.getElementById("imgPopupHeader");
                                const popupImg = document.getElementById("imgPopupImg");
                                const popupImg2 = document.getElementById("imgPopupImg2");
                                const popupLabel = document.getElementById("imgPopupLabel");
                                const popupDigits = document.getElementById("imgPopupDigits");

                                if (popupHeader) {
                                    popupHeader.textContent = header;
                                    popupHeader.style.display = "block";
                                }

                                if (pSrc) {
                                    popupImg.src = pSrc;
                                    popupImg.style.display = "block";
                                } else {
                                    popupImg.src = "";
                                    popupImg.style.display = "none";
                                }
                                if (oSrc) {
                                    popupImg2.src = oSrc;
                                    popupImg2.style.display = "block";
                                    popup.classList.add("dual-img");
                                } else {
                                    popupImg2.src = "";
                                    popupImg2.style.display = "none";
                                    popup.classList.remove("dual-img");
                                }
                                popupLabel.textContent = label;
                                // Reset display in case showImageLogic hid it
                                // earlier (typing-screen popup hides the label).
                                popupLabel.style.display = label
                                    ? "block"
                                    : "none";
                                if (popupDigits) {
                                    popupDigits.textContent = digits;
                                    popupDigits.style.display = "block";
                                    popupDigits.style.color = "";
                                }
                                popup.style.display = "block";

                                const pad = 14;
                                const pw = popup.offsetWidth || 220;
                                const ph = popup.offsetHeight || 220;
                                let x = e.clientX + pad;
                                let y = e.clientY + pad;
                                if (x + pw > window.innerWidth) x = e.clientX - pw - pad;
                                if (y + ph > window.innerHeight) y = e.clientY - ph - pad;
                                // Clamp to viewport so the popup is never
                                // partially off-screen (e.g. when the popup
                                // is taller than the viewport, or the flip
                                // puts it past the top edge).
                                x = Math.max(0, Math.min(x, window.innerWidth - pw));
                                y = Math.max(0, Math.min(y, window.innerHeight - ph));
                                popup.style.left = x + "px";
                                popup.style.top = y + "px";
                            };
                            cell._hoverLeave = () => {
                                const popup = document.getElementById("imgPopup");
                                const popupHeader = document.getElementById("imgPopupHeader");
                                popup.style.display = "none";
                                if (popupHeader) popupHeader.style.display = "none";
                                const popupImg = document.getElementById("imgPopupImg");
                                const popupImg2 = document.getElementById("imgPopupImg2");
                                popupImg.src = "";
                                popupImg2.src = "";
                            };
                            cell.addEventListener("mouseenter", cell._hoverEnter);
                            cell.addEventListener("mouseleave", cell._hoverLeave);
                        }

                        // Right-click to edit due date
                        cell.addEventListener("contextmenu", (e) => {
                            e.preventDefault();
                            // Hide the hover tooltip first
                            const popup = document.getElementById("imgPopup");
                            const popupHeader = document.getElementById("imgPopupHeader");
                            if (popup) popup.style.display = "none";
                            if (popupHeader) popupHeader.style.display = "none";
                            // Close any existing context menu
                            hidePiContextMenu();
                            // Show context menu
                            showPiContextMenu(e, cellPos, card, daysUntilDue, groupNum, mode);
                        });

                        // Left-click to open browse (practice) modal for this chunk
                        cell.addEventListener("click", (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Close the stats modal
                            const statsModal = document.getElementById("statsModal");
                            if (statsModal) statsModal.style.display = "none";
                            // Set practice index and open browse modal
                            // openFlashcards handles saveSettings and renderPracticeCard
                            openFlashcards(cellPos);
                        });

                        container.appendChild(cell);
                        p += gs;
                    }

                    // Update stats display (Due mode only)
                    // Update stats display (always visible, in both modes)
                    const elOverdue = document.getElementById("piStatOverdue");
                    const elNotAdded = document.getElementById("piStatNotAdded");
                    const elTotal = document.getElementById("piStatTotal");
                    if (elOverdue) elOverdue.textContent = pcStatsOverdue;
                    if (elNotAdded) elNotAdded.textContent = pcStatsNotAdded;
                    if (elTotal) elTotal.textContent = pcStatsTotal;

                    // Pad the last row to 50 cells with transparent placeholders
                    const totalCells = container.children.length;
                    const remainder = totalCells % 50;
                    if (remainder > 0) {
                        const padCount = 50 - remainder;
                        for (let i = 0; i < padCount; i++) {
                            const pad = document.createElement("div");
                            pad.style.cssText = "width:12px;height:12px;visibility:hidden;";
                            container.appendChild(pad);
                        }
                    }
                }

                // Pi coverage right-click context menu
                let _piContextPos = null;
                function showPiContextMenu(e, pos, card, daysUntilDue, groupNum, mode) {
                    const menu = document.getElementById("piContextMenu");
                    if (!menu) return;
                    _piContextPos = pos;

                    const header = menu.querySelector(".pi-context-header");
                    const info = menu.querySelector(".pi-context-info");
                    const daysInput = document.getElementById("piContextDays");
                    const applyBtn = document.getElementById("piContextApply");
                    const todayBtn = document.getElementById("piContextToday");
                    const removeBtn = document.getElementById("piContextRemove");

                    if (header) {
                        header.textContent = `Image #${groupNum} · Position #${pos + 1}`;
                    }
                    if (info) {
                        if (!card) {
                            info.textContent = "Not in deck";
                        } else {
                            const ease = card.easeFactor || 2.5;
                            info.textContent = `Due in ${daysUntilDue} day${daysUntilDue !== 1 ? "s" : ""} · Ease ${ease.toFixed(2)}`;
                        }
                    }
                    if (daysInput) {
                        daysInput.value = Math.max(0, daysUntilDue);
                        daysInput.disabled = false;
                    }
                    if (applyBtn) applyBtn.disabled = false;
                    if (todayBtn) todayBtn.disabled = false;
                    if (removeBtn) removeBtn.disabled = !card;

                    // Attach fresh click handler (replaces any previous).
                    if (applyBtn) {
                        if (applyBtn._applyHandler) {
                            applyBtn.removeEventListener(
                                "click",
                                applyBtn._applyHandler,
                            );
                        }
                        applyBtn._applyHandler = (ev) => {
                            ev.stopPropagation();
                            // Visual feedback: briefly flash button text.
                            const origText = applyBtn.textContent;
                            applyBtn.textContent = "✓";
                            setTimeout(() => {
                                applyBtn.textContent = origText;
                            }, 400);
                            if (_piContextPos === null) return;
                            if (!srsData[_piContextPos]) {
                                const _d = Math.max(
                                    0,
                                    parseInt(daysInput.value) || 0,
                                );
                                srsData[_piContextPos] = {
                                    interval: Math.max(1, _d),
                                    easeFactor: 2.5,
                                    dueDate: srsDaysFromNow(_d),
                                    reviews: 0,
                                    lapses: 0,
                                };
                            } else {
                                const _d = Math.max(
                                    0,
                                    parseInt(daysInput.value) || 0,
                                );
                                srsData[_piContextPos].dueDate =
                                    srsDaysFromNow(_d);
                                srsData[_piContextPos].interval = Math.max(
                                    _d,
                                    srsData[_piContextPos].interval || 0,
                                );
                            }
                            saveSettings();
                            renderPiCoverage();
                            srsUpdateBadge();
                            hidePiContextMenu();
                        };
                        applyBtn.addEventListener(
                            "click",
                            applyBtn._applyHandler,
                        );
                    }
                    if (todayBtn) {
                        if (todayBtn._todayHandler) {
                            todayBtn.removeEventListener(
                                "click",
                                todayBtn._todayHandler,
                            );
                        }
                        todayBtn._todayHandler = (ev) => {
                            ev.stopPropagation();
                            if (_piContextPos === null) return;
                            if (!srsData[_piContextPos]) {
                                // Direct creation (not srsAddCard) so
                                // the card shows colored immediately.
                                srsData[_piContextPos] = {
                                    interval: 1,
                                    easeFactor: 2.5,
                                    dueDate: srsToday(),
                                    reviews: 0,
                                    lapses: 0,
                                };
                            } else {
                                srsData[_piContextPos].dueDate = srsToday();
                                srsData[_piContextPos].interval = 0;
                                srsData[_piContextPos].reviews = 0;
                                srsData[_piContextPos].lapses = 0;
                            }
                            saveSettings();
                            renderPiCoverage();
                            srsUpdateBadge();
                            hidePiContextMenu();
                        };
                        todayBtn.addEventListener(
                            "click",
                            todayBtn._todayHandler,
                        );
                    }
                    if (removeBtn) {
                        if (removeBtn._removeHandler) {
                            removeBtn.removeEventListener(
                                "click",
                                removeBtn._removeHandler,
                            );
                        }
                        removeBtn._removeHandler = (ev) => {
                            ev.stopPropagation();
                            if (_piContextPos === null) return;
                            delete srsData[_piContextPos];
                            delete posTypedDates[_piContextPos];
                            saveSettings();
                            renderPiCoverage();
                            srsUpdateBadge();
                            hidePiContextMenu();
                        };
                        removeBtn.addEventListener(
                            "click",
                            removeBtn._removeHandler,
                        );
                    }

                    menu.style.display = "block";
                    // Position near cursor, but keep within viewport
                    const pad = 4;
                    const mw = menu.offsetWidth || 240;
                    const mh = menu.offsetHeight || 160;
                    let x = e.clientX;
                    let y = e.clientY;
                    if (x + mw + pad > window.innerWidth) x = window.innerWidth - mw - pad;
                    if (y + mh + pad > window.innerHeight) y = window.innerHeight - mh - pad;
                    menu.style.left = x + "px";
                    menu.style.top = y + "px";
                }

                function hidePiContextMenu() {
                    const menu = document.getElementById("piContextMenu");
                    if (menu) menu.style.display = "none";
                    _piContextPos = null;
                }

                function applyGoalBarSettings() {
                    const bar = document.getElementById("mainProgressBar");
                    const bottom = document.getElementById("goalBottomLabel");
                    const body = document.body;
                    if (!bar) return;
                    bar.style.display = goalBarHidden ? "none" : "";
                    if (bottom)
                        bottom.style.display =
                            goalBarHidden || goalBarPosition !== "bottom"
                                ? "none"
                                : "";
                    bar.classList.toggle(
                        "bar-bottom",
                        goalBarPosition === "bottom",
                    );
                    body.classList.toggle(
                        "bar-bottom-active",
                        goalBarPosition === "bottom" && !goalBarHidden,
                    );
                }

                // Apply the user-chosen accent color as CSS custom properties.
                // --accent     = the chosen color
                // --accent-soft = ~20% darker variant (used for gradients)
                function mixHex(hex, withHex, t) {
                    const a = parseInt(hex.slice(1), 16);
                    const b = parseInt(withHex.slice(1), 16);
                    const ar = (a >> 16) & 0xff,
                        ag = (a >> 8) & 0xff,
                        ab = a & 0xff;
                    const br = (b >> 16) & 0xff,
                        bg = (b >> 8) & 0xff,
                        bb = b & 0xff;
                    const r = Math.round(ar + (br - ar) * t);
                    const g = Math.round(ag + (bg - ag) * t);
                    const bl = Math.round(ab + (bb - ab) * t);
                    return (
                        "#" +
                        ((1 << 24) | (r << 16) | (g << 8) | bl)
                            .toString(16)
                            .slice(1)
                    );
                }
                function applyAccentColor() {
                    const r = document.documentElement;
                    r.style.setProperty("--accent", accentColor);
                    r.style.setProperty("--accent-soft", mixHex(accentColor, "#000000", 0.2));
                }

                // Lightweight goal-bar update used during typing — updates progress bar
                // and counter text without rebuilding the heatmap (which is expensive).
                function updateGoalBarOnly() {
                    const today = srsToday();
                    const todayCount = dailyStats[today] || 0;
                    const pct = Math.min(
                        100,
                        Math.round((todayCount / dailyGoal) * 100),
                    );
                    const el = (id) => document.getElementById(id);
                    if (el("statsTodayCount"))
                        el("statsTodayCount").textContent =
                            `${todayCount} / ${dailyGoal}`;
                    if (el("statsTodayBar"))
                        el("statsTodayBar").style.width = pct + "%";
                    if (el("goalCenterText"))
                        el("goalCenterText").textContent =
                            `${todayCount} / ${dailyGoal}`;
                    if (el("goalBottomLabel"))
                        el("goalBottomLabel").textContent =
                            `${todayCount} / ${dailyGoal}`;
                    if (el("mainProgressFill")) {
                        el("mainProgressFill").style.width = pct + "%";
                        el("mainProgressFill").classList.toggle(
                            "goal-reached",
                            todayCount >= dailyGoal,
                        );
                    }
                }

                function statsRefreshDisplay() {
                    const today = srsToday();
                    const todayCount = dailyStats[today] || 0;
                    const pct = Math.min(
                        100,
                        Math.round((todayCount / dailyGoal) * 100),
                    );
                    const el = (id) => document.getElementById(id);

                    if (el("statsTodayCount"))
                        el("statsTodayCount").textContent =
                            `${todayCount} / ${dailyGoal}`;
                    if (el("statsTodayBar"))
                        el("statsTodayBar").style.width = pct + "%";

                    const curStreak = computeCurrentStreak();
                    const longStreak = Math.max(
                        computeLongestStreak(),
                        curStreak,
                    );
                    const { best } = computeBestDay();
                    const dailyAvg = computeDailyAverage();
                    const daysLearnedPct = computeDaysLearnedPct();

                    if (el("statsDailyAvg"))
                        el("statsDailyAvg").textContent = dailyAvg;
                    if (el("statsDaysLearned"))
                        el("statsDaysLearned").textContent =
                            daysLearnedPct + "%";
                    if (el("statsCurrentStreak"))
                        el("statsCurrentStreak").textContent = curStreak;
                    if (el("statsLongestStreak"))
                        el("statsLongestStreak").textContent = longStreak;
                    if (el("statsBestDay"))
                        el("statsBestDay").textContent = best;
                    // Streak button: streak count only
                    if (el("streakCountDisplay"))
                        el("streakCountDisplay").textContent = curStreak;
                    // Center top-bar goal text (styled like position display)
                    if (el("goalCenterText"))
                        el("goalCenterText").textContent =
                            `${todayCount} / ${dailyGoal}`;
                    // Bottom label (only visible when bar is at bottom and not hidden)
                    if (el("goalBottomLabel"))
                        el("goalBottomLabel").textContent =
                            `${todayCount} / ${dailyGoal}`;
                    // Main-page progress bar fill
                    if (el("mainProgressFill")) {
                        el("mainProgressFill").style.width = pct + "%";
                        el("mainProgressFill").classList.toggle(
                            "goal-reached",
                            todayCount >= dailyGoal,
                        );
                    }

                    renderHeatmap();
                    renderReviewHeatmap();
                    renderPiCoverage();

                    // Year nav button listeners (only bind once)
                    if (!window._heatmapYearNavBound) {
                        window._heatmapYearNavBound = true;
                        const prevBtn = document.getElementById("heatmapPrevYear");
                        const nextBtn = document.getElementById("heatmapNextYear");
                        if (prevBtn) prevBtn.addEventListener("click", () => { heatmapViewYear--; renderHeatmap(); });
                        if (nextBtn) nextBtn.addEventListener("click", () => { heatmapViewYear++; renderHeatmap(); });

                        // Heatmap mode radio buttons
                        const modeRadios = document.querySelectorAll('input[name="heatmapMode"]');
                        modeRadios.forEach(radio => {
                            radio.addEventListener("change", (e) => {
                                heatmapMode = e.target.value;
                                renderHeatmap();
                            });
                        });

                        // Heatmap colour scheme dropdown
                        const schemeSel =
                            document.getElementById("heatmapSchemeSelect");
                        if (schemeSel) {
                            schemeSel.addEventListener("change", (e) => {
                                heatmapScheme = e.target.value;
                                saveSettings();
                                renderHeatmap();
                                renderPiCoverage();
                            });
                        }

                        // Pi coverage mode radio buttons (Due / Ease)
                        const piModeRadios = document.querySelectorAll('input[name="piCoverageMode"]');
                        piModeRadios.forEach(radio => {
                            radio.addEventListener("change", (e) => {
                                piCoverageMode = e.target.value;
                                renderPiCoverage();
                            });
                        });

                        // Pi coverage context menu: button handlers are attached via
                        // onclick in showPiContextMenu() each time the menu opens.
                        // Here we just set up the outside-click and wheel handlers.

                        // Prevent mousewheel from changing the number input value
                        const daysInputEl = document.getElementById("piContextDays");
                        if (daysInputEl) {
                            daysInputEl.addEventListener("wheel", (e) => {
                                e.preventDefault();
                            }, { passive: false });
                        }

                        // Close pi context menu on click outside
                        document.addEventListener("click", (e) => {
                            const menu = document.getElementById("piContextMenu");
                            if (menu && menu.style.display === "block" && !menu.contains(e.target)) {
                                hidePiContextMenu();
                            }
                        });
                        // Close pi context menu on Escape
                        document.addEventListener("keydown", (e) => {
                            if (e.key === "Escape") {
                                hidePiContextMenu();
                            }
                        });
                    }
                }

                function srsToday() {
                    const now = new Date();
                    // Subtract dayOffsetHours so e.g. 2am still counts as previous day
                    const shifted = new Date(
                        now.getTime() - dayOffsetHours * 3600000,
                    );
                    const y = shifted.getFullYear();
                    const m = String(shifted.getMonth() + 1).padStart(2, "0");
                    const d = String(shifted.getDate()).padStart(2, "0");
                    return `${y}-${m}-${d}`;
                }

                function srsDaysFromNow(n) {
                    const now = new Date();
                    const shifted = new Date(
                        now.getTime() - dayOffsetHours * 3600000,
                    );
                    shifted.setDate(shifted.getDate() + n);
                    const y = shifted.getFullYear();
                    const m = String(shifted.getMonth() + 1).padStart(2, "0");
                    const d = String(shifted.getDate()).padStart(2, "0");
                    return `${y}-${m}-${d}`;
                }

                function srsFormatDate(isoDate) {
                    if (!isoDate) return "";
                    const [y, m, d] = isoDate.split("-");
                    return `${d}-${m}-${y}`;
                }

                function srsIsDue(pos) {
                    const card = srsData[pos];
                    if (!card) return false; // not yet in SRS deck
                    return card.dueDate <= srsToday();
                }

                function srsDueCount() {
                    const today = srsToday();
                    const cfg = srsGetSettings();
                    const allDue = Object.values(srsData).filter(
                        (c) => c.dueDate <= today,
                    );
                    const newCards = allDue.filter((c) => c.reviews === 0);
                    const revCards = allDue.filter((c) => c.reviews > 0);
                    // Respect daily limits
                    const newCount = Math.min(
                        newCards.length,
                        Math.max(0, cfg.newPerDay - srsNewSeenToday),
                    );
                    // Review cap: same as Anki — the max reviews limit applies only to
                    // already-graduated (reviewed) cards. New cards that are overdue are
                    // counted under the newPerDay limit, not maxReviews.
                    const revCount = Math.min(revCards.length, cfg.maxReviews);
                    return newCount + revCount;
                }

                // Add a position to the SRS deck as a new learning card.
                // interval: 0 + step: 0 marks the card as not-yet-graduated —
                // in pi coverage it appears as an empty cell (waiting to
                // be reviewed), distinct from cards already in the review
                // deck (which have interval > 0 and step < 0/undefined).
                function srsAddCard(pos) {
                    if (srsData[pos]) return; // already exists
                    srsData[pos] = {
                        interval: 0,
                        easeFactor: 2.5,
                        dueDate: srsToday(),
                        reviews: 0,
                        lapses: 0,
                        step: 0,
                    };
                    saveSettings();
                }

                // SM-2 update: rating 1=Again 2=Hard 3=Good 4=Easy
                // Cards in learning (step >= 0) work like Anki: Again resets to step 0,
                // Good advances to next step, graduating when all steps are passed.
                // Cards in review (graduated, step === undefined/-1) use SM-2 spacing.
                //
                // isReviewScreen: which counter to update
                //   true  → rating came from the SRS review screen — always count
                //           as a review in the stats heatmap and bump the
                //           "new cards seen today" counter.
                //   false → rating came from a typing event and was explicitly
                //           NOT a real review (never count).
                //   null  → (default) auto-detect from the card's state:
                //           count as a review only if the card was already
                //           graduated (in the review deck) before this rating.
                //           Typing a learning-state card or a never-marked
                //           chunk is just practice, not a review.
                //
                // Returns: whether this rating incremented the daily
                // "cards reviewed" stat. Callers store this in the undo stack
                // so undo/redo only touch the stat when the original rating did.
                function srsRate(pos, rating, isReviewScreen = null) {
                    let card = srsData[pos];
                    if (!card)
                        card = srsData[pos] = {
                            interval: 0,
                            easeFactor: 2.5,
                            dueDate: srsToday(),
                            reviews: 0,
                            lapses: 0,
                            step: 0,
                        };
                    const cfg = srsGetSettings();
                    const lSteps =
                        cfg.learningSteps.length > 0
                            ? cfg.learningSteps
                            : [1, 10]; // minutes
                    const rSteps =
                        cfg.relrnSteps.length > 0 ? cfg.relrnSteps : [10];
                    const isLearning =
                        card.step !== undefined &&
                        card.step >= 0 &&
                        card.interval <= 0;
                    const isRelearning =
                        card.lapses > 0 &&
                        card.step !== undefined &&
                        card.step >= 0;
                    const inReviewState =
                        card.interval > 0 &&
                        (card.step === undefined || card.step < 0);
                    // Save the original due date so we can cap the new one
                    // (Anki "review ahead" behavior: never push a not-due card further out)
                    const originalDueDate = card.dueDate;
                    const steps = inReviewState
                        ? []
                        : isRelearning
                          ? rSteps
                          : lSteps;

                    // Decide whether this rating counts as a "review" in the
                    // stats heatmap. Auto-detect (null) → only if the card was
                    // already in the review deck. The "new cards seen today"
                    // counter only bumps for review-screen ratings.
                    const shouldCountDaily =
                        isReviewScreen !== null
                            ? isReviewScreen
                            : inReviewState;
                    const shouldCountNew = isReviewScreen === true;

                    if (shouldCountNew && card.reviews === 0)
                        srsNewSeenToday++;
                    card.reviews++;
                    if (shouldCountDaily) {
                        // Track daily review count for the reviews heatmap
                        const _today = srsToday();
                        dailyReviewStats[_today] =
                            (dailyReviewStats[_today] || 0) + 1;
                    }

                    if (inReviewState) {
                        // ── Graduated card: SM-2 ──
                        if (rating === 1) {
                            // Again — lapse back into relearning
                            card.lapses++;
                            card.easeFactor = Math.max(
                                1.3,
                                card.easeFactor - 0.2,
                            );
                            card.interval = 0;
                            card.step = 0; // start relearning steps
                            card.dueDate = srsToday(); // show again in this session
                        } else if (rating === 2) {
                            // Hard
                            card.interval = Math.max(
                                1,
                                Math.round(card.interval * 1.2),
                            );
                            card.easeFactor = Math.max(
                                1.3,
                                card.easeFactor - 0.15,
                            );
                            card.dueDate = srsDaysFromNow(card.interval);
                        } else if (rating === 3) {
                            // Good
                            card.interval = Math.max(
                                1,
                                Math.round(card.interval * card.easeFactor),
                            );
                            card.dueDate = srsDaysFromNow(card.interval);
                        } else {
                            // Easy
                            card.interval = Math.round(
                                card.interval * card.easeFactor * 1.3,
                            );
                            card.easeFactor = Math.min(
                                4.0,
                                card.easeFactor + 0.15,
                            );
                            card.dueDate = srsDaysFromNow(
                                Math.max(1, card.interval),
                            );
                        }
                    } else {
                        // ── Learning / Relearning steps ──
                        const curStep = card.step || 0;
                        if (rating === 1) {
                            // Again — reset to step 0
                            card.step = 0;
                            card.dueDate = srsToday(); // immediately back in queue
                        } else if (rating === 4) {
                            // Easy — graduate immediately
                            card.step = -1;
                            card.interval = isRelearning ? 1 : 4;
                            card.dueDate = srsDaysFromNow(card.interval);
                        } else if (rating === 3 || rating === 2) {
                            // Good (or Hard = same step for simplicity)
                            const nextStep = curStep + 1;
                            if (nextStep >= steps.length) {
                                // Graduate to review
                                card.step = -1;
                                card.interval = isRelearning
                                    ? 1
                                    : card.interval > 0
                                      ? Math.round(
                                            card.interval * card.easeFactor,
                                        )
                                      : 1;
                                card.dueDate = srsDaysFromNow(card.interval);
                            } else {
                                card.step = nextStep;
                                card.dueDate = srsToday(); // stays in today's queue
                            }
                        }
                    }
                    // Cap: if this was a review-state card (graduated, interval > 0)
                    // that was NOT yet due when rated, and the new due date is
                    // further out than the original, keep the original due date.
                    // (Anki "review ahead" behavior: reviewing a not-due card
                    // can shorten or maintain the interval, but never increase
                    // it.) Overdue and due-today cards always get the new
                    // due date — keeping the past due date would leave them
                    // permanently overdue.
                    if (
                        card.interval > 0 &&
                        (card.step === undefined || card.step < 0) &&
                        card.dueDate > originalDueDate &&
                        originalDueDate > srsToday()
                    ) {
                        card.dueDate = originalDueDate;
                    }
                    saveSettings();
                    return shouldCountDaily;
                }

                function srsNextInterval(pos, rating) {
                    const card = srsData[pos] || {
                        interval: 0,
                        easeFactor: 2.5,
                        reviews: 0,
                        step: 0,
                    };
                    const cfg = srsGetSettings();
                    const lSteps =
                        cfg.learningSteps.length > 0
                            ? cfg.learningSteps
                            : [1, 10];
                    const rSteps =
                        cfg.relrnSteps.length > 0 ? cfg.relrnSteps : [10];
                    const isReview =
                        card.interval > 0 &&
                        (card.step === undefined || card.step < 0);
                    if (isReview) {
                        if (rating === 1) return "learn";
                        if (rating === 2)
                            return (
                                Math.max(1, Math.round(card.interval * 1.2)) +
                                "d"
                            );
                        if (rating === 3)
                            return (
                                Math.max(
                                    1,
                                    Math.round(card.interval * card.easeFactor),
                                ) + "d"
                            );
                        return (
                            Math.max(
                                1,
                                Math.round(
                                    card.interval * card.easeFactor * 1.3,
                                ),
                            ) + "d"
                        );
                    }
                    // Learning/relearning
                    const steps = card.lapses > 0 ? rSteps : lSteps;
                    const curStep = card.step || 0;
                    if (rating === 1) return (steps[0] || 1) + "m";
                    if (rating === 4) return card.lapses > 0 ? "1d" : "4d";
                    const nextStep = curStep + 1;
                    if (nextStep >= steps.length)
                        return card.lapses > 0 ? "1d" : "1d";
                    return (steps[nextStep] || 10) + "m";
                }

                // ═══════════════════════════════════════════
                // SRS REVIEW UI
                // ═══════════════════════════════════════════

                let srsQueue = [];
                let srsQueueIndex = 0;
                let srsSessionDone = 0;
                let srsHistory = []; // { pos, oldCard } for undo
                // Per-day session tracking — prevents re-adding new cards on re-open
                let srsSessionDate = ""; // which day this session belongs to
                let srsNewSeenToday = 0; // how many new cards shown so far today

                function srsRenderPAO(containerEl, imagesEl, d) {
                    // PAO row
                    containerEl.innerHTML = `
                        <div class="srs-pao-item">
                            <span class="srs-pao-term">${d.pTerm}</span>
                            <span class="srs-pao-num">${d.pNum}</span>
                        </div>
                        <div class="srs-pao-item">
                            <span class="srs-pao-term">${d.aTerm}</span>
                            <span class="srs-pao-num">${d.aNum}</span>
                        </div>
                        <div class="srs-pao-item">
                            <span class="srs-pao-term">${d.oTerm}</span>
                            <span class="srs-pao-num">${d.oNum}</span>
                        </div>
                    `;
                    // Inline images
                    imagesEl.innerHTML = "";
                    const pEntry = lookupAnkiEntry(d.pNum);
                    const oEntry = lookupAnkiEntry(d.oNum);
                    const pSrc = pEntry ? getImgSrc(pEntry.personSrc) : null;
                    const oSrc = oEntry ? getImgSrc(oEntry.objectSrc) : null;
                    if (pSrc) {
                        const img = document.createElement("img");
                        img.src = pSrc;
                        img.alt = d.pTerm;
                        img.onerror = () => img.remove();
                        imagesEl.appendChild(img);
                    }
                    if (oSrc) {
                        const img = document.createElement("img");
                        img.src = oSrc;
                        img.alt = d.oTerm;
                        img.onerror = () => img.remove();
                        imagesEl.appendChild(img);
                    }
                    if (!pSrc && !oSrc) imagesEl.style.display = "none";
                    else imagesEl.style.display = "flex";
                }

                function srsShowCard() {
                    const pos = srsQueue[srsQueueIndex];
                    if (pos === undefined) {
                        srsUpdateBadge();
                        srsShowEmpty();
                        return;
                    }
                    document.getElementById("srsActive").style.display =
                        "block";
                    document.getElementById("srsEmpty").style.display = "none";

                    // Progress: count remaining by category
                    const remaining = srsQueue.slice(srsQueueIndex);
                    let nNew = 0,
                        nLearn = 0,
                        nReview = 0;
                    remaining.forEach((p) => {
                        const card = srsData[p];
                        if (!card || card.reviews === 0) nNew++;
                        // Learning: card is in learning steps (step >= 0, not yet graduated)
                        // Review: card has graduated (step < 0 or undefined, has a real interval)
                        else if (card.step !== undefined && card.step >= 0) nLearn++;
                        else nReview++;
                    });
                    document.getElementById("srsCountNew").textContent = nNew;
                    document.getElementById("srsCountLearn").textContent =
                        nLearn;
                    document.getElementById("srsCountReview").textContent =
                        nReview;

                    // Underline the type that the current card belongs to
                    const card = srsData[pos];
                    const cardType =
                        !card || card.reviews === 0
                            ? "new"
                            : card.interval <= 1
                              ? "learn"
                              : "review";
                    ["srsCountNew", "srsCountLearn", "srsCountReview"].forEach(
                        (id) => {
                            document.getElementById(id).style.textDecoration =
                                "none";
                        },
                    );
                    const underlineId =
                        cardType === "new"
                            ? "srsCountNew"
                            : cardType === "learn"
                              ? "srsCountLearn"
                              : "srsCountReview";
                    document.getElementById(underlineId).style.textDecoration =
                        "underline";

                    const mode = getModeForPos(pos + 1);
                    const gSize = getGroupSizeForMode(mode);
                    const prevPos = pos - gSize;
                    const prevMode = getModeForPos(prevPos + 1);
                    const groupNum = posToGroupNum(pos) + 1;
                    const rawMode =
                        document.getElementById("srsRawMode")?.checked ??
                        srsRawMode;

                    // FRONT META: position and image num (hidden in raw mode)
                    document.getElementById("srsFrontMeta").textContent =
                        rawMode
                            ? ""
                            : prevPos >= 0
                              ? `IMAGE ${posToGroupNum(prevPos) + 1}  ·  POSITION ${prevPos + 1}`
                              : "(start of sequence)";
                    if (prevPos >= 0) {
                        const prevD = getPAOGroupDataByPos(prevPos, prevMode);
                        srsRenderPAO(
                            document.getElementById("srsFrontPAO"),
                            document.getElementById("srsFrontImages"),
                            prevD,
                        );
                    } else {
                        document.getElementById("srsFrontPAO").innerHTML =
                            `<div style="color:#aaa;font-size:0.9rem;padding:8px 0;">This is the first chunk — no predecessor.</div>`;
                        document.getElementById("srsFrontImages").innerHTML =
                            "";
                    }

                    // BACK META: hidden in raw mode
                    document.getElementById("srsBackMeta").textContent = rawMode
                        ? ""
                        : `IMAGE ${groupNum}  ·  POSITION ${pos + 1}`;
                    const d = getPAOGroupDataByPos(pos, mode);
                    srsRenderPAO(
                        document.getElementById("srsBackPAO"),
                        document.getElementById("srsBackImages"),
                        d,
                    );

                    // Reset reveal state
                    document.getElementById("srsFront").style.display = "block";
                    document.getElementById("srsBack").style.display = "none";
                    document.getElementById("srsRevealBtn").style.display =
                        "block";
                    document
                        .getElementById("srsRatingRow")
                        .classList.remove("visible");

                    // Update next-interval preview on buttons
                    [1, 2, 3, 4].forEach((r) => {
                        const iv = srsNextInterval(pos, r);
                        const ids = [
                            "srsAgainDays",
                            "srsHardDays",
                            "srsGoodDays",
                            "srsEasyDays",
                        ];
                        const label =
                            typeof iv === "string"
                                ? iv
                                : iv === 1
                                  ? "1 day"
                                  : `${iv} days`;
                        document.getElementById(ids[r - 1]).textContent = label;
                    });
                }

                function srsReveal() {
                    // Swap: hide front content, show back in its place
                    document.getElementById("srsFront").style.display = "none";
                    document.getElementById("srsBack").style.display = "block";
                    document.getElementById("srsRevealBtn").style.display =
                        "none";
                    document
                        .getElementById("srsRatingRow")
                        .classList.add("visible");
                }

                let _srsCountdownTimer = null;
                function srsStartCountdown(isoDate) {
                    if (_srsCountdownTimer) clearInterval(_srsCountdownTimer);
                    const el = document.getElementById("srsNextDue");
                    function update() {
                        const now = new Date();
                        const target = new Date(isoDate + "T00:00:00");
                        const diff = target - now;
                        if (diff <= 0) {
                            el.textContent = "Cards available now — refresh!";
                            clearInterval(_srsCountdownTimer);
                            return;
                        }
                        const days = Math.floor(diff / 86400000);
                        const hours = Math.floor((diff % 86400000) / 3600000);
                        const mins = Math.floor((diff % 3600000) / 60000);
                        const parts = [];
                        if (days > 0) parts.push(`${days}d`);
                        if (hours > 0) parts.push(`${hours}h`);
                        parts.push(`${mins}m`);
                        el.textContent = `Next card in ${parts.join(" ")}`;
                    }
                    update();
                    _srsCountdownTimer = setInterval(update, 30000);
                }

                function srsGetSettings() {
                    return {
                        newPerDay:
                            parseInt(
                                document.getElementById("srsNewPerDay")?.value,
                            ) || 20,
                        maxReviews:
                            parseInt(
                                document.getElementById("srsMaxReviews")?.value,
                            ) || 200,
                        learningSteps: (
                            document.getElementById("srsLearningSteps")
                                ?.value || "1 10"
                        )
                            .trim()
                            .split(/\s+/)
                            .map(Number)
                            .filter(Boolean),
                        relrnSteps: (
                            document.getElementById("srsRelrnSteps")?.value ||
                            "10"
                        )
                            .trim()
                            .split(/\s+/)
                            .map(Number)
                            .filter(Boolean),
                        insertionOrder:
                            document.getElementById("srsInsertionOrder")
                                ?.value || "sequential",
                        newReviewOrder:
                            document.getElementById("srsNewReviewOrder")
                                ?.value || "mix",
                        reviewSortOrder:
                            document.getElementById("srsReviewSortOrder")
                                ?.value || "due-random",
                    };
                }

                function srsBuildQueue() {
                    const today = srsToday();
                    const cfg = srsGetSettings();

                    // Reset day counter if new day
                    if (srsSessionDate !== today) {
                        srsSessionDate = today;
                        srsNewSeenToday = 0;
                    }

                    const newRemaining = Math.max(
                        0,
                        cfg.newPerDay - srsNewSeenToday,
                    );

                    // All due cards split by category
                    let allDueNew = Object.entries(srsData).filter(
                        ([, v]) => v.dueDate <= today && v.reviews === 0,
                    );
                    let allDueReview = Object.entries(srsData).filter(
                        ([, v]) => v.dueDate <= today && v.reviews > 0,
                    );

                    // Insertion order for new cards
                    if (cfg.insertionOrder === "sequential") {
                        allDueNew.sort(([a], [b]) => parseInt(a) - parseInt(b));
                    } else {
                        // Random
                        for (let i = allDueNew.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [allDueNew[i], allDueNew[j]] = [
                                allDueNew[j],
                                allDueNew[i],
                            ];
                        }
                    }

                    // Review sort order
                    if (cfg.reviewSortOrder === "due-random") {
                        allDueReview.sort(([, a], [, b]) => {
                            if (a.dueDate !== b.dueDate)
                                return a.dueDate.localeCompare(b.dueDate);
                            return Math.random() - 0.5;
                        });
                    } else if (cfg.reviewSortOrder === "due") {
                        allDueReview.sort(([, a], [, b]) =>
                            a.dueDate.localeCompare(b.dueDate),
                        );
                    } else if (cfg.reviewSortOrder === "random") {
                        for (let i = allDueReview.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [allDueReview[i], allDueReview[j]] = [
                                allDueReview[j],
                                allDueReview[i],
                            ];
                        }
                    }

                    const limitedNew = allDueNew
                        .slice(0, newRemaining)
                        .map(([k]) => parseInt(k));
                    const limitedReviews = allDueReview
                        .slice(0, cfg.maxReviews)
                        .map(([k]) => parseInt(k));

                    let queue;
                    if (cfg.newReviewOrder === "new-first") {
                        queue = [...limitedNew, ...limitedReviews];
                    } else if (cfg.newReviewOrder === "review-first") {
                        queue = [...limitedReviews, ...limitedNew];
                    } else {
                        // Mix: interleave new into reviews
                        queue = [];
                        const step =
                            limitedNew.length > 0
                                ? Math.max(
                                      1,
                                      Math.floor(
                                          limitedReviews.length /
                                              limitedNew.length,
                                      ),
                                  )
                                : Infinity;
                        let ri = 0,
                            ni = 0;
                        while (
                            ri < limitedReviews.length ||
                            ni < limitedNew.length
                        ) {
                            for (
                                let s = 0;
                                s < step && ri < limitedReviews.length;
                                s++
                            )
                                queue.push(limitedReviews[ri++]);
                            if (ni < limitedNew.length)
                                queue.push(limitedNew[ni++]);
                        }
                    }

                    return queue;
                }

                function srsShowEmpty() {
                    document.getElementById("srsActive").style.display = "none";
                    document.getElementById("srsEmpty").style.display = "block";
                    const next = Object.values(srsData)
                        .map((c) => c.dueDate)
                        .sort()[0];
                    if (next && next > srsToday()) {
                        srsStartCountdown(next);
                    } else if (next) {
                        // Cards exist with dueDate <= today, but check if a new session
                        // would actually have anything (daily limits may be exhausted)
                        const newQueue = srsBuildQueue();
                        if (newQueue.length > 0) {
                            document.getElementById("srsNextDue").textContent =
                                "Cards available — open a new session!";
                        } else {
                            document.getElementById("srsNextDue").textContent =
                                "All done for today! 🎉";
                        }
                    } else {
                        document.getElementById("srsNextDue").textContent = "";
                    }
                }

                let srsQueueBuildSettings = null; // cached settings fingerprint

                function srsOpenModal() {
                    const curCfg = srsGetSettings();
                    const curFingerprint = JSON.stringify(curCfg);
                    // Rebuild if date changed, queue empty, or settings changed (e.g. newPerDay)
                    if (
                        srsQueue.length === 0 ||
                        srsSessionDate !== srsToday() ||
                        srsQueueBuildSettings !== curFingerprint
                    ) {
                        srsQueue = srsBuildQueue();
                        srsQueueBuildSettings = curFingerprint;
                    }
                    srsQueueIndex = 0;
                    srsSessionDone = 0;
                    srsHistory = [];

                    srsModal.style.display = "block";
                    imagesModal.style.display = "none";

                    if (srsQueue.length === 0) {
                        srsShowEmpty();
                    } else {
                        document.getElementById("srsEmpty").style.display =
                            "none";
                        document.getElementById("srsActive").style.display =
                            "block";
                        srsShowCard();
                    }
                }

                function srsUpdateBadge() {
                    const n = srsDueCount();
                    const badge = document.getElementById("srsDueBadge");
                    if (badge) {
                        badge.textContent = n;
                        badge.style.display = n > 0 ? "inline" : "none";
                    }
                }

                // Wire SRS add: when user types past a group in normal mode, auto-add to SRS deck
                function srsAutoAddFromTyping(absPos) {
                    const mode = getModeForPos(absPos + 1);
                    const gSize = getGroupSizeForMode(mode);
                    const groupStart = snapToGroupStart(absPos);
                    // Only add complete groups
                    if (groupStart + gSize <= absPos + 1) {
                        srsAddCard(groupStart);
                    }
                }

                // --- Everest Mode ---
                function everestBuildBlocks(fromDigit, toDigit) {
                    // fromDigit / toDigit are 1-based digit positions (inclusive)
                    const blocks = [];
                    const startPos0 = fromDigit - 1; // 0-based
                    const endPos0 = toDigit - 1; // 0-based (inclusive start of block)

                    // Walk through both PAO modes and collect eligible blocks
                    // A block is eligible if:
                    //   - its start position falls within [startPos0, endPos0]
                    //   - there is a full block before it (prev block doesn't go below 0)
                    //   - there is a full block after it
                    const modes = ["222", "323"];
                    for (const mode of modes) {
                        const gSize = getGroupSizeForMode(mode);
                        // Determine which digit positions belong to this mode
                        const modeStart0 =
                            mode === "323" ? range323Start - 1 : 0;
                        const modeEnd0 =
                            mode === "323"
                                ? Math.min(range323End, PI_DIGITS.length) - 1
                                : range222End - 1;
                        // Align first block to mode boundary
                        const first =
                            Math.ceil(Math.max(startPos0, modeStart0) / gSize) *
                            gSize;
                        for (
                            let p = first;
                            p <= Math.min(endPos0, modeEnd0);
                            p += gSize
                        ) {
                            if (
                                p - gSize >= 0 &&
                                p + gSize * 2 <= PI_DIGITS.length
                            )
                                blocks.push({ pos: p, mode });
                        }
                    }
                    return blocks;
                }

                function everestCountBlocks(fromDigit, toDigit) {
                    return everestBuildBlocks(fromDigit, toDigit).length;
                }

                function everestPaoLabel(pos, mode) {
                    const d = getPAOGroupDataByPos(pos, mode);
                    if (!d) return "";
                    return d.pTerm + " / " + d.aTerm + " / " + d.oTerm;
                }

                // Build PAO HTML with hoverable person and object spans (like flashcards)
                function everestPaoHTML(pos, mode) {
                    const d = getPAOGroupDataByPos(pos, mode);
                    if (!d) return "";
                    return `${d.pTerm} / ${d.aTerm} / ${d.oTerm}`;
                }

                function everestRenderImages(imgContainerEl, pos, mode) {
                    if (!imgContainerEl) return;
                    imgContainerEl.innerHTML = "";
                    const d = getPAOGroupDataByPos(pos, mode);
                    if (!d) return;
                    const pEntry = lookupAnkiEntry(d.pNum);
                    const oEntry = lookupAnkiEntry(d.oNum);
                    const pSrc = pEntry ? getImgSrc(pEntry.personSrc) : null;
                    const oSrc = oEntry ? getImgSrc(oEntry.objectSrc) : null;
                    if (pSrc) {
                        const img = document.createElement("img");
                        img.src = pSrc;
                        img.alt = d.pTerm;
                        img.style.cssText =
                            "max-width:80px;max-height:80px;border-radius:5px;object-fit:contain;border:1px solid #eee;";
                        img.onerror = () => img.remove();
                        imgContainerEl.appendChild(img);
                    }
                    if (oSrc) {
                        const img = document.createElement("img");
                        img.src = oSrc;
                        img.alt = d.oTerm;
                        img.style.cssText =
                            "max-width:80px;max-height:80px;border-radius:5px;object-fit:contain;border:1px solid #eee;";
                        img.onerror = () => img.remove();
                        imgContainerEl.appendChild(img);
                    }
                }

                function initEverestPaoHovers(containerEl) {
                    /* no-op: images now shown inline */
                }

                // Render digit string with per-digit correct/wrong colouring
                function everestColorDigits(typed, correct) {
                    let html = "";
                    for (let i = 0; i < correct.length; i++) {
                        const t = typed[i] || "";
                        if (!t) {
                            html += `<span style="color:#bbb;">_</span>`;
                        } else if (t === correct[i]) {
                            html += `<span style="color:${correctColor};">${t}</span>`;
                        } else {
                            html += `<span style="color:${incorrectColor};text-decoration:underline;">${t}</span>`;
                        }
                    }
                    return html;
                }

                function everestUpdateInputDisplay() {
                    const inp = document.getElementById("everestInput");
                    const val = inp.value.replace(/[^0-9]/g, "");
                    const mode = getModeForPos(everestCurrentPos + 1);
                    const gSize = getGroupSizeForMode(mode);
                    const prevTyped = val.substring(0, gSize);
                    const nextTyped = val.substring(gSize, gSize * 2);
                    const prevEl = document.getElementById("everestInputPrev");
                    const nextEl = document.getElementById("everestInputNext");
                    // Show typed digits + placeholder dots
                    prevEl.textContent = prevTyped
                        .padEnd(gSize, "_")
                        .replace(/_/g, "·");
                    nextEl.textContent = nextTyped
                        .padEnd(gSize, "_")
                        .replace(/_/g, "·");
                    // Highlight active half
                    const dispEl = document.getElementById(
                        "everestInputDisplay",
                    );
                    const isDark =
                        document.body.classList.contains("dark-mode");
                    const activeBg = isDark ? "#2c2c46" : "#fafbff";
                    if (val.length < gSize) {
                        prevEl.style.background = activeBg;
                        nextEl.style.background = "transparent";
                        dispEl.style.borderColor = "#667eea";
                    } else {
                        prevEl.style.background = "transparent";
                        nextEl.style.background = activeBg;
                        dispEl.style.borderColor =
                            val.length >= gSize * 2
                                ? isDark
                                    ? "#555"
                                    : "#888"
                                : "#667eea";
                    }
                }

                // Re-render the current question from saved state (used when resuming)
                function everestRenderCurrentQuestion() {
                    if (everestCurrentPos < 0) {
                        everestNewRound();
                        return;
                    }
                    const mode = getModeForPos(everestCurrentPos + 1);
                    const gSize = getGroupSizeForMode(mode);
                    const idx = Math.floor(everestCurrentPos / gSize);

                    document.getElementById("everestBlockNum").textContent =
                        idx + 1;
                    document.getElementById("everestDigits").textContent =
                        PI_DIGITS.substr(everestCurrentPos, gSize);
                    document.getElementById("everestPiPos").textContent =
                        everestCurrentPos + 1;
                    // Raw mode: hidden while prompting, revealed once the answer is shown.
                    const infoEl = document.getElementById("everestInfoLine");
                    if (infoEl)
                        infoEl.style.display =
                            everestRawMode && !everestAnswered ? "none" : "";

                    if (everestAnswered) {
                        // Re-render the answered state
                        document.getElementById(
                            "everestSubmitBtn",
                        ).style.display = "none";
                        document.getElementById(
                            "everestNextBtn",
                        ).style.display = "inline-block";
                        // Restore input display with coloured digits from localStorage isn't practical,
                        // so just show blank input with next prompt
                        const inp = document.getElementById("everestInput");
                        inp.value = "";
                        inp.disabled = true;
                        everestUpdateInputDisplay();
                        // Show context with PAO (we can't restore typed digits exactly, just show correct)
                        const prev = PI_DIGITS.substr(
                            everestCurrentPos - gSize,
                            gSize,
                        );
                        const next = PI_DIGITS.substr(
                            everestCurrentPos + gSize,
                            gSize,
                        );
                        const prevMode = getModeForPos(
                            everestCurrentPos - gSize + 1,
                        );
                        const nextMode = getModeForPos(
                            everestCurrentPos + gSize + 1,
                        );
                        document.getElementById(
                            "everestPrevCorrect",
                        ).textContent = prev;
                        document.getElementById("everestPrevTyped").innerHTML =
                            "";
                        document.getElementById(
                            "everestNextCorrect",
                        ).textContent = next;
                        document.getElementById("everestNextTyped").innerHTML =
                            "";
                        document.getElementById("everestShownCtx").textContent =
                            PI_DIGITS.substr(everestCurrentPos, gSize);
                        document.getElementById(
                            "everestShownPAOCtx",
                        ).textContent = everestPaoHTML(everestCurrentPos, mode);
                        everestRenderImages(
                            document.getElementById("everestShownImgs"),
                            everestCurrentPos,
                            mode,
                        );
                        document.getElementById("everestPrevPAO").textContent =
                            everestPaoHTML(everestCurrentPos - gSize, prevMode);
                        everestRenderImages(
                            document.getElementById("everestPrevImgs"),
                            everestCurrentPos - gSize,
                            prevMode,
                        );
                        document.getElementById("everestNextPAO").textContent =
                            everestPaoHTML(everestCurrentPos + gSize, nextMode);
                        everestRenderImages(
                            document.getElementById("everestNextImgs"),
                            everestCurrentPos + gSize,
                            nextMode,
                        );
                        document.getElementById(
                            "everestContext",
                        ).style.display = "block";
                        document.getElementById(
                            "everestInputDisplay",
                        ).style.borderColor = document.body.classList.contains(
                            "dark-mode",
                        )
                            ? "#555"
                            : "#888";
                    } else {
                        document.getElementById(
                            "everestContext",
                        ).style.display = "none";
                        document.getElementById(
                            "everestSubmitBtn",
                        ).style.display = "inline-block";
                        document.getElementById(
                            "everestNextBtn",
                        ).style.display = "none";
                        const inp = document.getElementById("everestInput");
                        inp.value = "";
                        inp.disabled = false;
                        document.getElementById(
                            "everestInputPrev",
                        ).style.background = document.body.classList.contains(
                            "dark-mode",
                        )
                            ? "#2c2c46"
                            : "#fafbff";
                        document.getElementById(
                            "everestInputNext",
                        ).style.background = "transparent";
                        document.getElementById(
                            "everestInputDisplay",
                        ).style.borderColor = "#667eea";
                        everestUpdateInputDisplay();
                        inp.focus();
                    }
                }

                function everestNewRound() {
                    everestAnswered = false;
                    const blocks = everestBuildBlocks(
                        everestFromDigit,
                        everestToDigit,
                    );
                    if (!blocks.length) {
                        alert(
                            "No valid blocks in that digit range. Try a wider range.",
                        );
                        return;
                    }
                    const chosen =
                        blocks[Math.floor(Math.random() * blocks.length)];
                    everestCurrentPos = chosen.pos;
                    const mode = chosen.mode;
                    const gSize = getGroupSizeForMode(mode);
                    const idx = Math.floor(everestCurrentPos / gSize);

                    document.getElementById("everestBlockNum").textContent =
                        idx + 1;
                    document.getElementById("everestDigits").textContent =
                        PI_DIGITS.substr(everestCurrentPos, gSize);
                    document.getElementById("everestPiPos").textContent =
                        everestCurrentPos + 1;
                    // Raw mode: hide image # / pi position while the question is being asked.
                    const infoEl = document.getElementById("everestInfoLine");
                    if (infoEl)
                        infoEl.style.display = everestRawMode ? "none" : "";

                    // Easy mode: show images of the current block during the prompt
                    const easyImgsEl =
                        document.getElementById("everestEasyImgs");
                    if (easyImgsEl) {
                        if (everestEasyMode) {
                            easyImgsEl.style.display = "flex";
                            everestRenderImages(
                                easyImgsEl,
                                everestCurrentPos,
                                mode,
                            );
                        } else {
                            easyImgsEl.style.display = "none";
                            easyImgsEl.innerHTML = "";
                        }
                    }

                    // Hide context (answer blocks)
                    document.getElementById("everestContext").style.display = "none";
                    const inp = document.getElementById("everestInput");
                    inp.value = "";
                    inp.disabled = false;
                    document.getElementById("everestInputPrev").textContent = "";
                    document.getElementById("everestInputNext").textContent = "";
                    document.getElementById("everestInputDisplay").style.borderColor = "#667eea";
                    document.getElementById("everestInputPrev").style.background = document.body.classList.contains("dark-mode") ? "#2c2c46" : "#fafbff";
                    document.getElementById("everestInputNext").style.background = "transparent";
                    document.getElementById("everestSubmitBtn").style.display = "inline-block";
                    document.getElementById("everestNextBtn").style.display = "none";
                    everestAnswered = false;
                    everestInProgress = true;
                    saveSettings();
                    everestUpdateInputDisplay();
                    inp.focus();
                }

                function everestSubmit() {
                    if (everestAnswered || everestCurrentPos < 0) return;
                    const mode = getModeForPos(everestCurrentPos + 1);
                    const gSize = getGroupSizeForMode(mode);
                    const prev = PI_DIGITS.substr(
                        everestCurrentPos - gSize,
                        gSize,
                    );
                    const next = PI_DIGITS.substr(
                        everestCurrentPos + gSize,
                        gSize,
                    );
                    const correct = prev + next;
                    const inp = document.getElementById("everestInput");
                    const answer = inp.value.replace(/[^0-9]/g, "");
                    everestAnswered = true;
                    inp.disabled = true; // lock input so it can't be edited after the answer is revealed
                    // Hide easy-mode hint images now that the full context panel is about to show
                    const easyImgsEl =
                        document.getElementById("everestEasyImgs");
                    if (easyImgsEl) {
                        easyImgsEl.style.display = "none";
                        easyImgsEl.innerHTML = "";
                    }
                    // Raw mode: now that the answer is revealed, show the image # / pi position.
                    const infoEl = document.getElementById("everestInfoLine");
                    if (infoEl) infoEl.style.display = "";

                    const ok = answer === correct;
                    const prevTyped = answer.substring(0, gSize);
                    const nextTyped = answer.substring(gSize, gSize * 2);

                    // Colour the user's typed input display (green/red per digit)
                    document.getElementById("everestInputPrev").innerHTML =
                        everestColorDigits(prevTyped, prev);
                    document.getElementById("everestInputNext").innerHTML =
                        everestColorDigits(nextTyped, next);
                    document.getElementById(
                        "everestInputDisplay",
                    ).style.borderColor = ok ? correctColor : incorrectColor;
                    document.getElementById(
                        "everestInputPrev",
                    ).style.background = "transparent";
                    document.getElementById(
                        "everestInputNext",
                    ).style.background = "transparent";

                    // 3-block context panel
                    const prevMode = getModeForPos(
                        everestCurrentPos - gSize + 1,
                    );
                    const nextMode = getModeForPos(
                        everestCurrentPos + gSize + 1,
                    );
                    const isDark =
                        document.body.classList.contains("dark-mode");
                    const correctBg = isDark ? "#1a2e1a" : "#f0fdf4";
                    const incorrectBg = isDark ? "#2e1a1a" : "#fff8f8";
                    const neutralBorder = isDark ? "#3d3d46" : "#ccc";

                    // SHOWN block: correct digits + PAO (revealed now)
                    document.getElementById("everestShownCtx").textContent =
                        PI_DIGITS.substr(everestCurrentPos, gSize);
                    document.getElementById("everestShownPAOCtx").textContent =
                        everestPaoHTML(everestCurrentPos, mode);
                    everestRenderImages(
                        document.getElementById("everestShownImgs"),
                        everestCurrentPos,
                        mode,
                    );

                    // BEFORE block: correct digits; typed digits hidden (shown in input area)
                    document.getElementById("everestPrevCorrect").textContent =
                        prev;
                    document.getElementById("everestPrevTyped").innerHTML = "";
                    document.getElementById("everestPrevPAO").textContent =
                        everestPaoHTML(everestCurrentPos - gSize, prevMode);
                    everestRenderImages(
                        document.getElementById("everestPrevImgs"),
                        everestCurrentPos - gSize,
                        prevMode,
                    );
                    document.getElementById(
                        "everestPrevBlock",
                    ).style.borderColor = ok ? correctColor : incorrectColor;
                    document.getElementById(
                        "everestPrevBlock",
                    ).style.background = ok ? correctBg : incorrectBg;

                    // AFTER block: correct digits; typed digits hidden (shown in input area)
                    document.getElementById("everestNextCorrect").textContent =
                        next;
                    document.getElementById("everestNextTyped").innerHTML = "";
                    document.getElementById("everestNextPAO").textContent =
                        everestPaoHTML(everestCurrentPos + gSize, nextMode);
                    everestRenderImages(
                        document.getElementById("everestNextImgs"),
                        everestCurrentPos + gSize,
                        nextMode,
                    );
                    document.getElementById(
                        "everestNextBlock",
                    ).style.borderColor = ok ? correctColor : incorrectColor;
                    document.getElementById(
                        "everestNextBlock",
                    ).style.background = ok ? correctBg : incorrectBg;

                    document.getElementById("everestContext").style.display =
                        "block";

                    if (ok) {
                        everestScore++;
                        // Update the per-mode high score (only if range is at least as large)
                        const key = everestModeKey();
                        const hs = everestHighScores[key] || {
                            score: 0,
                            from: 1,
                            to: 3000,
                        };
                        const curRange = everestToDigit - everestFromDigit;
                        const hsRange = hs.to - hs.from;
                        if (
                            everestScore > hs.score ||
                            (everestScore === hs.score && curRange > hsRange)
                        ) {
                            everestHighScores[key] = {
                                score: everestScore,
                                from: everestFromDigit,
                                to: everestToDigit,
                            };
                            // Keep legacy field updated too for backwards compat
                            everestHighScore = everestScore;
                            everestHSFrom = everestFromDigit;
                            everestHSTo = everestToDigit;
                        }
                    } else {
                        everestScore = 0;
                        // Wrong answer: rate the associated SRS cards as Again so they come up in review
                        const prevPos_ = everestCurrentPos - gSize;
                        const nextPos_ = everestCurrentPos + gSize;
                        const prevCorrect_ = prevTyped === prev;
                        const nextCorrect_ = nextTyped === next;
                        [prevPos_, nextPos_].forEach((p, idx) => {
                            const wasWrong =
                                idx === 0 ? !prevCorrect_ : !nextCorrect_;
                            if (wasWrong && p >= 0 && p < PI_DIGITS.length) {
                                const _oldCardEverest = srsData[p]
                                    ? { ...srsData[p] }
                                    : null;
                                if (!srsData[p])
                                    srsData[p] = {
                                        interval: 0,
                                        easeFactor: 2.5,
                                        dueDate: srsToday(),
                                        reviews: 0,
                                        lapses: 0,
                                        step: 0,
                                    };
                                const _countedAsReview = srsRate(p, 1, srsIsDue(p)); // Again
                                mistakeUndoStack.push({
                                    pos: p,
                                    oldCard: _oldCardEverest,
                                    countedAsReview: _countedAsReview,
                                });
                                if (mistakeUndoStack.length > 20)
                                    mistakeUndoStack.shift();
                                srsUpdateBadge();
                            }
                        });
                    }
                    everestAnswered = true; // already set above but ensure persisted
                    saveSettings();
                    document.getElementById("everestScore").textContent =
                        everestScore;
                    document.getElementById("everestHighScore").textContent =
                        everestHighScore;
                    everestRefreshHSDisplay();
                    document.getElementById("everestSubmitBtn").style.display =
                        "none";
                    document.getElementById("everestNextBtn").style.display =
                        "inline-block";
                }

                function everestQuit() {
                    everestInProgress = false;
                    everestCurrentPos = -1;
                    everestScore = 0;
                    everestAnswered = false;
                    saveSettings();
                    document.getElementById("everestGame").style.display =
                        "none";
                    document.getElementById("everestSetup").style.display =
                        "block";
                    everestRefreshHSDisplay();
                }

                function everestRefreshHSDisplay() {
                    const key = everestModeKey();
                    const hs = everestHighScores[key] || {
                        score: 0,
                        from: 1,
                        to: 3000,
                    };
                    const modeLabel =
                        key === "normal"
                            ? "normal"
                            : key === "raw"
                              ? "raw"
                              : key === "easy"
                                ? "easy"
                                : "raw+easy";
                    // Mode label in setup header
                    const ml = document.getElementById("everestHSModeLabel");
                    if (ml) ml.textContent = modeLabel;
                    // Best score values
                    const dispEl = document.getElementById("everestHSDisplay");
                    const gameEl = document.getElementById("everestHighScore");
                    if (dispEl) dispEl.textContent = hs.score;
                    if (gameEl) gameEl.textContent = hs.score;
                    const rangeStr = hs.from + "–" + hs.to;
                    const wrap = document.getElementById("everestHSRangeWrap");
                    const rangeEl = document.getElementById("everestHSRange");
                    if (wrap && rangeEl) {
                        if (hs.score > 0) {
                            rangeEl.textContent = rangeStr;
                            wrap.style.display = "inline";
                        } else {
                            wrap.style.display = "none";
                        }
                    }
                    const gameRange =
                        document.getElementById("everestHSRangeGame");
                    if (gameRange)
                        gameRange.textContent =
                            hs.score > 0
                                ? `Best (${modeLabel}): ${hs.score}  ${rangeStr}`
                                : "";
                }

                // --- UI Updating ---
                function updateThemeColors() {
                    const r = document.documentElement.style;
                    r.setProperty("--background-color", currentBackgroundColor);
                    r.setProperty("--button-text", currentBackgroundColor);
                    r.setProperty("--highlight-correct", correctColor);
                    r.setProperty("--highlight-incorrect", incorrectColor);
                }
                function setBackground() {
                    if (
                        useCustomBg &&
                        _storage.getItem("customBackgroundImage")
                    ) {
                        document.body.style.backgroundImage = `url(${_storage.getItem("customBackgroundImage")})`;
                        document.body.style.backgroundColor = "transparent";
                        // Force black text only on main-page buttons that sit directly on the background photo,
                        // not on buttons inside modals (which have their own backgrounds and dark-mode theming).
                        document
                            .querySelectorAll(
                                ".button, .action-button, .tri-btn",
                            )
                            .forEach((b) => {
                                if (!b.closest(".modal-content"))
                                    b.style.color = "#000";
                            });
                    } else {
                        document.body.style.backgroundImage = "none";
                        document.body.style.backgroundColor =
                            currentBackgroundColor;
                        document
                            .querySelectorAll(
                                ".button, .action-button, .tri-btn",
                            )
                            .forEach((b) => (b.style.color = ""));
                    }
                }
                function updateSettingsUI() {
                    document
                        .getElementById("paoTextareaSection")
                        .classList.toggle(
                            "active",
                            paoDataSource === "textarea",
                        );
                    document
                        .getElementById("paoExcelSection")
                        .classList.toggle("active", paoDataSource === "excel");
                }

                // --- Event Listeners ---
                function init() {
                    piInput = document.getElementById("piInput");
                    outputDiv = document.getElementById("output");
                    outputContainer =
                        document.getElementById("output-container");
                    helperTextElement = document.getElementById("helperText");
                    settingsModal = document.getElementById("settingsModal");
                    imagesModal = document.getElementById("imagesModal");
                    practiceModal = document.getElementById("practiceModal");
                    personListTextarea = document.getElementById("personList");
                    actionListTextarea = document.getElementById("actionList");
                    objectListTextarea = document.getElementById("objectList");
                    // Live PAO textarea validation on the Settings page
                    const wireSettingsPaoTa = (id, setter) => {
                        const el = document.getElementById(id);
                        if (el)
                            el.addEventListener("input", () => {
                                setter(parsePaoList(el.value));
                                _updateSettingsPaoValidation();
                            });
                    };
                    wireSettingsPaoTa("personList", (m) => (personList = m));
                    wireSettingsPaoTa("actionList", (m) => (actionList = m));
                    wireSettingsPaoTa("objectList", (m) => (objectList = m));
                    imagesListDiv = document.getElementById("imagesList");
                    srsModal = document.getElementById("srsModal");
                    practiceSeekImg =
                        document.getElementById("practiceSeekImg");
                    practiceSeekPos =
                        document.getElementById("practiceSeekPos");
                    pracPerson = document.getElementById("pracPerson");
                    pracPersonNum = document.getElementById("pracPersonNum");
                    pracAction = document.getElementById("pracAction");
                    pracActionNum = document.getElementById("pracActionNum");
                    pracObject = document.getElementById("pracObject");
                    pracObjectNum = document.getElementById("pracObjectNum");
                    flashcardEl = document.getElementById("flashcard");
                    volSlider = document.getElementById("volSlider");
                    imgPopup = document.getElementById("imgPopup");
                    imgPopupImg = document.getElementById("imgPopupImg");
                    imgPopupImg2 = document.getElementById("imgPopupImg2");
                    imgPopupLabel = document.getElementById("imgPopupLabel");
                    imgPopupDigits = document.getElementById("imgPopupDigits");
                    // Hide broken hover images gracefully
                    if (imgPopupImg)
                        imgPopupImg.onerror = () => {
                            imgPopupImg.style.display = "none";
                        };
                    if (imgPopupImg2)
                        imgPopupImg2.onerror = () => {
                            imgPopupImg2.style.display = "none";
                        };

                    document.getElementById("hintBtn").onclick = (e) => {
                        e.preventDefault();
                        showHintLogic();
                        piInput.focus();
                    };
                    document.getElementById("revealBtn").onclick = (e) => {
                        e.preventDefault();
                        showRevealLogic();
                        piInput.focus();
                    };
                    document.getElementById("imgBtn").onclick = (e) => {
                        e.preventDefault();
                        showImageLogic();
                        piInput.focus();
                    };

                    piInput.addEventListener("input", () => {
                        checkPiDigits(piInput);
                        saveSettingsDebounced();
                    });

                    // When the tab becomes visible after a day change,
                    // re-credit so the goal bar shows the correct count
                    // for today without requiring a keystroke.
                    document.addEventListener("visibilitychange", () => {
                        if (
                            document.visibilityState === "visible" &&
                            typeof creditDailyDigits === "function"
                        ) {
                            creditDailyDigits(piInput.value || "");
                        }
                    });

                    // Prevent buttons stealing focus from piInput on mobile
                    document
                        .querySelectorAll(
                            "button:not(#everestSubmitBtn):not(#everestNextBtn):not(#everestQuitBtn):not(#practicePrevBtn):not(#practiceNextBtn):not(.srs-rate-btn):not(#srsRevealBtn):not(#piContextApply):not(#piContextToday):not(#piContextRemove)",
                        )
                        .forEach((btn) => {
                            btn.addEventListener("mousedown", (e) =>
                                e.preventDefault(),
                            );
                            btn.addEventListener(
                                "touchstart",
                                (e) => {
                                    // Don't prevent default (breaks tap), but refocus input after
                                },
                                { passive: true },
                            );
                            btn.addEventListener(
                                "touchend",
                                (e) => {
                                    // Small delay so the click fires first, then refocus
                                    if (
                                        btn.closest(
                                            "#settingsModal, #practiceModal, #imagesModal, #srsModal, #everestModal, #statsModal",
                                        )
                                    )
                                        return;
                                    setTimeout(() => piInput.focus(), 50);
                                },
                                { passive: true },
                            );
                        });
                    piInput.addEventListener(
                        "click",
                        (e) =>
                            (e.target.selectionStart = e.target.selectionEnd =
                                e.target.value.length),
                    );
                    piInput.addEventListener("keydown", (e) => {
                        if (
                            isInputLocked &&
                            ![
                                "Backspace",
                                "Delete",
                                "ArrowLeft",
                                "ArrowRight",
                                "Tab",
                            ].includes(e.key)
                        )
                            e.preventDefault();
                    });

                    // Auto-seek to current on list open
                    function openListModal() {
                        if (currentInputLength > 0) {
                            // Highlight the group CONTAINING the last typed digit
                            const lastTypedPos =
                                sequenceStartIndex + currentInputLength - 1;
                            practiceIndex = snapToGroupStart(lastTypedPos);
                            saveSettings();
                        }
                        // else: keep practiceIndex as-is (last flashcard the user was on)

                        displayList(true);
                        imagesModal.style.display = "block";
                    }

                    document.getElementById("viewImagesButton").onclick =
                        openListModal;
                    document.getElementById("settingsButton").onclick = () =>
                        (settingsModal.style.display = "block");

                    document.getElementById("testModeToggle").onclick = () =>
                        testSetMode(!testMode);

                    // Stats / Daily Goal
                    document.getElementById("statsButton").onclick = () => {
                        statsRefreshDisplay();
                        document.getElementById("statsModal").style.display =
                            "block";
                    };
                    document.getElementById("statsClose").onclick = () => {
                        document.getElementById("statsModal").style.display =
                            "none";
                        piInput.focus();
                    };
                    document
                        .getElementById("dailyGoalInput")
                        .addEventListener("change", (e) => {
                            let v = parseInt(e.target.value);
                            if (isNaN(v) || v < 10) v = 10;
                            dailyGoal = v;
                            e.target.value = v;
                            saveSettings();
                            statsRefreshDisplay();
                        });
                    document.getElementById("testSubmitBtn").onclick =
                        testSubmit;
                    document.getElementById("testContinueBtn").onclick =
                        testReset;

                    // Click timer to toggle show/hide
                    document.getElementById("testTimer").onclick = () => {
                        testShowTimer = false;
                        saveSettings();
                        testRenderTimer();
                    };
                    document.getElementById("testTimerHidden").onclick = () => {
                        testShowTimer = true;
                        saveSettings();
                        testRenderTimer();
                    };

                    document.querySelectorAll(".close").forEach((b) => {
                        if (b.id === "statsClose" || b.id === "srsClose")
                            return; // these have their own dedicated handlers below/above
                        b.onclick = () => {
                            settingsModal.style.display = "none";
                            imagesModal.style.display = "none";
                            practiceModal.style.display = "none";
                            piInput.focus();
                        };
                    });
                    document.querySelector(".back-arrow").onclick = () => {
                        practiceModal.style.display = "none";
                        imagesModal.style.display = "block";
                        displayList(true);
                    };

                    // Everest
                    const everestModal =
                        document.getElementById("everestModal");
                    document.getElementById("everestButton").onclick = () => {
                        imagesModal.style.display = "none";
                        everestModal.style.display = "block";
                        everestRefreshHSDisplay();
                        if (everestInProgress && everestCurrentPos >= 0) {
                            // Resume: go straight to game screen and re-render current question
                            document.getElementById(
                                "everestSetup",
                            ).style.display = "none";
                            document.getElementById(
                                "everestGame",
                            ).style.display = "block";
                            document.getElementById(
                                "everestScore",
                            ).textContent = everestScore;
                            everestRenderCurrentQuestion();
                        } else {
                            document.getElementById(
                                "everestGame",
                            ).style.display = "none";
                            document.getElementById(
                                "everestSetup",
                            ).style.display = "block";
                            document.getElementById("everestFromPos").value =
                                everestFromDigit;
                            document.getElementById("everestToPos").value =
                                everestToDigit;
                            everestUpdateRangeInfo();
                        }
                    };
                    // Live block count preview on range inputs
                    function everestUpdateRangeInfo() {
                        const from =
                            parseInt(
                                document.getElementById("everestFromPos").value,
                            ) || 1;
                        const to =
                            parseInt(
                                document.getElementById("everestToPos").value,
                            ) || 3000;
                        const n = everestCountBlocks(from, to);
                        const info =
                            document.getElementById("everestRangeInfo");
                        if (n === 0) {
                            info.innerHTML =
                                '<span style="color:#f87171;">No valid blocks in this range</span>';
                        } else {
                            info.textContent =
                                n +
                                " block" +
                                (n === 1 ? "" : "s") +
                                " available";
                        }
                    }
                    document
                        .getElementById("everestFromPos")
                        .addEventListener("input", everestUpdateRangeInfo);
                    document
                        .getElementById("everestToPos")
                        .addEventListener("input", everestUpdateRangeInfo);

                    document.getElementById("everestStartBtn").onclick = () => {
                        everestFromDigit =
                            parseInt(
                                document.getElementById("everestFromPos").value,
                            ) || 1;
                        everestToDigit =
                            parseInt(
                                document.getElementById("everestToPos").value,
                            ) || 3000;
                        everestRawMode =
                            document.getElementById("everestHideInfo").checked;
                        everestEasyMode =
                            document.getElementById("everestEasyMode").checked;
                        if (everestFromDigit >= everestToDigit) {
                            alert("'From' must be less than 'To'.");
                            return;
                        }
                        const n = everestCountBlocks(
                            everestFromDigit,
                            everestToDigit,
                        );
                        if (n === 0) {
                            alert(
                                "No valid blocks in that digit range. Try a wider range.",
                            );
                            return;
                        }
                        everestScore = 0;
                        everestInProgress = true;
                        document.getElementById("everestScore").textContent = 0;
                        everestRefreshHSDisplay();
                        document.getElementById("everestSetup").style.display =
                            "none";
                        document.getElementById("everestGame").style.display =
                            "block";
                        saveSettings();
                        everestNewRound();
                    };
                    document
                        .getElementById("everestHideInfo")
                        .addEventListener("change", (e) => {
                            everestRawMode = e.target.checked;
                            everestRefreshHSDisplay(); // update best score for new mode
                            saveSettings();
                        });
                    document
                        .getElementById("everestEasyMode")
                        .addEventListener("change", (e) => {
                            everestEasyMode = e.target.checked;
                            everestRefreshHSDisplay(); // update best score for new mode
                            saveSettings();
                        });
                    document.getElementById("everestSubmitBtn").onclick =
                        everestSubmit;
                    document.getElementById("everestNextBtn").onclick = () => {
                        everestNewRound();
                    };
                    document.getElementById("everestQuitBtn").onclick =
                        everestQuit;
                    document
                        .getElementById("everestInput")
                        .addEventListener("input", () => {
                            if (everestAnswered) return; // answer already revealed — don't let typing alter the display
                            // Strip non-digits, cap at 2*gSize
                            const inp = document.getElementById("everestInput");
                            const mode = getModeForPos(everestCurrentPos + 1);
                            const gSize = getGroupSizeForMode(mode);
                            inp.value = inp.value
                                .replace(/[^0-9]/g, "")
                                .substring(0, gSize * 2);
                            everestUpdateInputDisplay();
                        });
                    document
                        .getElementById("everestInput")
                        .addEventListener("keydown", (e) => {
                            if (e.key !== "Enter") return;
                            e.stopPropagation();
                            if (!everestAnswered) everestSubmit();
                            else {
                                everestNewRound();
                            }
                        });
                    everestModal.querySelectorAll(".close").forEach(
                        (b) =>
                            (b.onclick = () => {
                                everestModal.style.display = "none";
                                piInput.focus();
                            }),
                    );
                    document.getElementById("everestBackBtn").onclick = () => {
                        everestModal.style.display = "none";
                        imagesModal.style.display = "block";
                        displayList(true);
                    };
                    document.getElementById("practicePrevBtn").onclick = () =>
                        handleNav(-1);
                    document.getElementById("practiceNextBtn").onclick = () =>
                        handleNav(1);

                    // Review-mode toggle for the browse modal.
                    const _rtBtn = document.getElementById("reviewModeToggle");
                    if (_rtBtn) {
                        _rtBtn.addEventListener("change", () => {
                            isReviewMode = _rtBtn.checked;
                            applyReviewModeUI();
                            saveSettings();
                        });
                    }

                    // SRS events
                    document.getElementById("openSRSButton").onclick =
                        srsOpenModal;
                    document.getElementById("srsRevealBtn").onclick = srsReveal;
                    ["srsAgain", "srsHard", "srsGood", "srsEasy"].forEach(
                        (id, i) => {
                            document.getElementById(id).onclick = () => {
                                const pos = srsQueue[srsQueueIndex];
                                // Save snapshot for undo
                                srsHistory.push({
                                    pos,
                                    queueIndex: srsQueueIndex,
                                    sessionDone: srsSessionDone,
                                    oldCard: srsData[pos]
                                        ? { ...srsData[pos] }
                                        : null,
                                    queueSnapshot: [...srsQueue],
                                });
                                srsRate(pos, i + 1, true);
                                srsSessionDone++;
                                srsQueueIndex++;
                                // If rated Again or if card is still in learning (step >= 0), re-add to end of queue
                                const updatedCard = srsData[pos];
                                if (
                                    updatedCard &&
                                    updatedCard.interval <= 0 &&
                                    updatedCard.dueDate <= srsToday()
                                ) {
                                    // Card is still in learning — add back 10 positions ahead or at end (whichever comes first), Anki-style
                                    const reinsertAt = Math.min(
                                        srsQueueIndex + 10,
                                        srsQueue.length,
                                    );
                                    srsQueue.splice(reinsertAt, 0, pos);
                                }
                                srsShowCard();
                            };
                        },
                    );
                    document.getElementById("srsSettingsBtn").onclick = () => {
                        // Show SRS settings as a separate sub-modal over the review screen
                        document.getElementById(
                            "srsSettingsModal",
                        ).style.display = "block";
                        // Sync raw mode checkbox to current state
                        const rmEl = document.getElementById("srsRawMode");
                        if (rmEl) rmEl.checked = srsRawMode;
                    };
                    document.getElementById("srsSettingsBackArrow").onclick =
                        () => {
                            // Save raw mode, close sub-modal, stay in SRS
                            const rmEl = document.getElementById("srsRawMode");
                            if (rmEl) {
                                srsRawMode = rmEl.checked;
                                saveSettings();
                            }
                            document.getElementById(
                                "srsSettingsModal",
                            ).style.display = "none";
                        };
                    document.getElementById("srsSettingsClose").onclick =
                        () => {
                            const rmEl = document.getElementById("srsRawMode");
                            if (rmEl) {
                                srsRawMode = rmEl.checked;
                                saveSettings();
                            }
                            document.getElementById(
                                "srsSettingsModal",
                            ).style.display = "none";
                            srsModal.style.display = "none";
                            piInput.focus();
                        };
                    document.getElementById("srsBackArrow").onclick = () => {
                        if (_srsCountdownTimer)
                            clearInterval(_srsCountdownTimer);
                        srsModal.style.display = "none";
                        imagesModal.style.display = "block";
                        displayList(true);
                    };
                    document.getElementById("srsClose").onclick = () => {
                        if (_srsCountdownTimer)
                            clearInterval(_srsCountdownTimer);
                        srsModal.style.display = "none";
                        piInput.focus();
                    };
                    document.addEventListener("keydown", (e) => {
                        if (srsModal.style.display !== "block") return;
                        const revealed =
                            document.getElementById("srsBack").style.display !==
                            "none";
                        if ((e.ctrlKey || e.metaKey) && e.key === "z") {
                            e.preventDefault();
                            if (srsHistory.length > 0) {
                                const snap = srsHistory.pop();
                                if (snap.oldCard)
                                    srsData[snap.pos] = snap.oldCard;
                                else delete srsData[snap.pos];
                                srsQueueIndex = snap.queueIndex;
                                srsSessionDone = snap.sessionDone;
                                if (snap.queueSnapshot)
                                    srsQueue = snap.queueSnapshot;
                                saveSettings();
                                srsShowCard();
                            }
                            return;
                        }
                        if (
                            (e.code === "Space" || e.key === "Enter") &&
                            !revealed
                        ) {
                            e.preventDefault();
                            srsReveal();
                        } else if (revealed) {
                            if (e.key === "1")
                                document.getElementById("srsAgain").click();
                            else if (e.key === "2" || e.key.toUpperCase() === hardHotkey)
                                document.getElementById("srsHard").click();
                            else if (e.key === "3")
                                document.getElementById("srsGood").click();
                            else if (e.key === "4")
                                document.getElementById("srsEasy").click();
                        }
                    });
                    srsUpdateBadge();

                    // ── Firebase Sync UI wiring ──
                    const _fbCfgInput = document.getElementById("firebaseConfigInput");
                    if (_fbCfgInput) {
                        // Live border validation as the user types
                        _fbCfgInput.addEventListener("input", () => _fbValidateBorder(_fbCfgInput));
                        // Apply border on load if there's an existing value
                        if (_fbCfgInput.value) _fbValidateBorder(_fbCfgInput);
                    }
                    document.getElementById("firebaseConnectBtn").onclick =
                        () => {
                            const cfg = document
                                .getElementById("firebaseConfigInput")
                                .value.trim();
                            if (!cfg) {
                                _fbStatus(
                                    "Paste your Firebase config first",
                                    "#e05252",
                                );
                                return;
                            }
                            _fbConnect(cfg);
                        };
                    document.getElementById("syncNowBtn").onclick = () => {
                        _fbPush();
                        _fbStatus("Pushing…", "#667eea");
                    };
                    document.getElementById("syncPullBtn").onclick = () => {
                        _fbPull();
                        _fbStatus("Pulling…", "#667eea");
                    };
                    // Init firebase if previously configured
                    _fbInit();

                    // ── Media folder path "Test" button (local dev only) ──
                    const _testPathBtn = document.getElementById("ankiMediaPathTestBtn");
                    const _testPathStatus = document.getElementById("ankiMediaPathTestStatus");
                    if (_testPathBtn) {
                        if (!_isLocalDev()) {
                            const pathRow = _testPathBtn.closest(".setting-row");
                            if (pathRow) pathRow.style.display = "none";
                        } else {
                            _testPathBtn.onclick = async () => {
                                if (!_testPathStatus) return;
                                _testPathStatus.style.display = "";
                                _testPathStatus.className = "anki-status";
                                // If mediaFileMap has entries, report those are in use
                                const mapCount = Object.keys(mediaFileMap).length;
                                if (mapCount > 0) {
                                    _testPathStatus.textContent = `✓ Using uploaded media (${mapCount} images in memory — takes priority over path)`;
                                    _testPathStatus.className = "anki-status loaded";
                                    return;
                                }
                                // Otherwise test the configured path by fetching a sample image
                                const path = (document.getElementById("ankiMediaPathInput")?.value || "media").trim();
                                // Find a sample filename from the loaded txt exports
                                let sample = null;
                                for (const map of [ankiImages, ankiImages2]) {
                                    for (const entry of Object.values(map)) {
                                        if (entry.personSrc) { sample = entry.personSrc; break; }
                                    }
                                    if (sample) break;
                                }
                                if (!sample) {
                                    _testPathStatus.textContent = "Load a .txt export first to get a sample filename to test.";
                                    return;
                                }
                                const url = path ? `${path}/${sample}` : sample;
                                _testPathStatus.textContent = `Testing ${url}…`;
                                try {
                                    const res = await fetch(url, { method: "HEAD" });
                                    if (res.ok) {
                                        _testPathStatus.textContent = `✓ Path working — found ${sample} at "${path}"`;
                                        _testPathStatus.className = "anki-status loaded";
                                    } else {
                                        _testPathStatus.textContent = `✗ ${res.status} for "${url}" — check your path`;
                                    }
                                } catch (e) {
                                    _testPathStatus.textContent = `✗ Could not fetch "${url}" — ${e.message}`;
                                }
                            };
                        }
                    }

                    document.getElementById("srsAddRangeBtn").onclick = () => {
                        const fromPos = parseInt(
                            document.getElementById("srsAddFrom").value,
                        );
                        const toPos = parseInt(
                            document.getElementById("srsAddTo").value,
                        );
                        if (
                            isNaN(fromPos) ||
                            isNaN(toPos) ||
                            fromPos >= toPos
                        ) {
                            alert("Enter a valid range (From < To).");
                            return;
                        }
                        let added = 0;
                        let pos = snapToGroupStart(fromPos - 1);
                        const endPos = toPos - 1;
                        while (pos <= endPos && pos < PI_DIGITS.length) {
                            const mode = getModeForPos(pos + 1);
                            const gSize = getGroupSizeForMode(mode);
                            if (pos + gSize > PI_DIGITS.length) break;
                            if (!srsData[pos]) {
                                srsAddCard(pos);
                                added++;
                            }
                            pos += gSize;
                        }
                        saveSettings();
                        srsUpdateBadge();
                        displayList(false);
                        alert(
                            `Added ${added} new card${added !== 1 ? "s" : ""} to SRS (${fromPos}–${toPos}).`,
                        );
                    };

                    practiceSeekImg.oninput = (e) => {
                        let v = parseInt(e.target.value);
                        if (isNaN(v) || v < 1) v = 1;
                        // Find the abs pos of the v-th group
                        let p = 0,
                            count = 0;
                        while (p < PI_DIGITS.length) {
                            const m = getModeForPos(p + 1);
                            const gs = getGroupSizeForMode(m);
                            if (p + gs > PI_DIGITS.length) break;
                            count++;
                            if (count === v) {
                                practiceIndex = p;
                                break;
                            }
                            p += gs;
                        }
                        saveSettings();
                        renderPracticeCard();
                    };
                    practiceSeekPos.oninput = (e) => {
                        let v = parseInt(e.target.value);
                        if (isNaN(v) || v < 1) v = 1;
                        practiceIndex = snapToGroupStart(v - 1);
                        saveSettings();
                        renderPracticeCard();
                    };

                    // Settings Events
                    document
                        .querySelectorAll(
                            "#settingsForm input, #settingsForm select, #settingsForm textarea",
                        )
                        .forEach((el) => {
                            el.addEventListener("input", saveSettings);
                            el.addEventListener("change", () => {
                                saveSettings();
                                updateSettingsUI();
                            });
                        });

                    document
                        .querySelectorAll("input[name='paoDataSource']")
                        .forEach((r) =>
                            r.addEventListener("change", (e) => {
                                paoDataSource = e.target.value;
                                saveSettings();
                                updateSettingsUI();
                            }),
                        );

                    // PAO range mode radio (222 / 323 / both)
                    document
                        .querySelectorAll("input[name='paoRangeMode']")
                        .forEach((r) =>
                            r.addEventListener("change", (e) => {
                                paoRangeMode = e.target.value;
                                _applyPaoRangeMode();
                                saveSettings();
                            }),
                        );

                    // Live update: when the user edits the crossover input,
                    // mirror the value into rangeCrossover and re-apply the
                    // mode (so the four derived range vars stay in sync).
                    const crossEl =
                        document.getElementById("rangeCrossover");
                    if (crossEl) {
                        crossEl.addEventListener("input", () => {
                            const v = parseInt(crossEl.value);
                            if (!isNaN(v)) {
                                rangeCrossover = v;
                                _applyPaoRangeMode();
                            }
                        });
                    }

                    // Anki TXT Upload
                    document.getElementById("ankiTxtUpload").onchange = (e) => {
                        const f = e.target.files[0];
                        if (!f) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                            ankiImages = parseAnkiTxt(ev.target.result);
                            saveSettings();
                            const count = Math.round(
                                Object.keys(ankiImages).length / 3,
                            );
                            const statusEl =
                                document.getElementById("ankiLoadStatus");
                            statusEl.textContent = `✓ ${count} entries loaded`;
                            statusEl.className = "anki-status loaded";
                            // Mirror into the installer if it's open
                            const instEl = document.getElementById("instAnkiStatus1");
                            if (instEl) { instEl.textContent = statusEl.textContent; instEl.className = statusEl.className; }
                            alert(`Loaded ${count} Millennium PAO entries!`);
                            _installerUpdateNextButton();
                        };
                        reader.readAsText(f);
                        e.target.value = "";
                    };

                    document.getElementById("ankiTxtUpload2").onchange = (
                        e,
                    ) => {
                        const f = e.target.files[0];
                        if (!f) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                            ankiImages2 = parseAnkiTxt(ev.target.result);
                            saveSettings();
                            const count = Math.round(
                                Object.keys(ankiImages2).length / 3,
                            );
                            const statusEl2 =
                                document.getElementById("ankiLoadStatus2");
                            statusEl2.textContent = `✓ ${count} entries loaded`;
                            statusEl2.className = "anki-status loaded";
                            // Mirror into the installer if it's open
                            const instEl2 = document.getElementById("instAnkiStatus2");
                            if (instEl2) { instEl2.textContent = statusEl2.textContent; instEl2.className = statusEl2.className; }
                            alert(`Loaded ${count} Century PAO entries!`);
                            _installerUpdateNextButton();
                        };
                        reader.readAsText(f);
                        e.target.value = "";
                    };

                    // ── Media Folder Picker (File System Access API) ──────────────
                    const IDB_NAME = "piPaoMedia",
                        IDB_STORE = "handles",
                        IDB_KEY = "dirHandle";

                    function openIDB() {
                        return new Promise((res, rej) => {
                            const req = indexedDB.open(IDB_NAME, 1);
                            req.onupgradeneeded = (e) =>
                                e.target.result.createObjectStore(IDB_STORE);
                            req.onsuccess = (e) => res(e.target.result);
                            req.onerror = (e) => rej(e.target.error);
                        });
                    }
                    async function saveDirHandle(handle) {
                        const db = await openIDB();
                        return new Promise((res, rej) => {
                            const tx = db.transaction(IDB_STORE, "readwrite");
                            tx.objectStore(IDB_STORE).put(handle, IDB_KEY);
                            tx.oncomplete = res;
                            tx.onerror = rej;
                        });
                    }
                    async function loadDirHandle() {
                        const db = await openIDB();
                        return new Promise((res) => {
                            const tx = db.transaction(IDB_STORE, "readonly");
                            const req = tx.objectStore(IDB_STORE).get(IDB_KEY);
                            req.onsuccess = (e) => res(e.target.result || null);
                            req.onerror = () => res(null);
                        });
                    }

                    async function loadMediaFromHandle(dirHandle) {
                        // Revoke old object URLs
                        Object.values(mediaFileMap).forEach((u) => {
                            try {
                                URL.revokeObjectURL(u);
                            } catch (e) {}
                        });
                        mediaFileMap = {};
                        let count = 0;
                        for await (const [name, entry] of dirHandle.entries()) {
                            if (entry.kind !== "file") continue;
                            const lower = name.toLowerCase();
                            if (!lower.match(/\.(jpg|jpeg|png|gif|webp|svg)$/))
                                continue;
                            try {
                                const file = await entry.getFile();
                                mediaFileMap[name] = URL.createObjectURL(file);
                                count++;
                            } catch (e) {}
                        }
                        mediaFolderName = dirHandle.name;
                        saveSettings();
                        _setMediaStatus("✓ Media loaded.", true);
                        return count;
                    }

                    // ── IDB v3: mediaBlobs store holds individual extracted images ──
                    // Avoids re-extracting the full zip on every page load.
                    // v2's mediaZip store is kept in the schema for upgrade
                    // compat but is no longer written to.
                    const IDB_ZIP_STORE = "mediaZip",
                        IDB_ZIP_KEY = "zip",
                        IDB_BLOBS_STORE = "mediaBlobs";

                    function openIDBv3() {
                        return new Promise((res, rej) => {
                            const req = indexedDB.open(IDB_NAME, 3);
                            req.onupgradeneeded = (e) => {
                                const db = e.target.result;
                                if (!db.objectStoreNames.contains(IDB_STORE))
                                    db.createObjectStore(IDB_STORE);
                                if (!db.objectStoreNames.contains(IDB_ZIP_STORE))
                                    db.createObjectStore(IDB_ZIP_STORE);
                                if (!db.objectStoreNames.contains(IDB_BLOBS_STORE))
                                    db.createObjectStore(IDB_BLOBS_STORE);
                            };
                            req.onsuccess = (e) => res(e.target.result);
                            req.onerror = (e) => rej(e.target.error);
                        });
                    }

                    // Save extracted image Uint8Arrays to IDB.
                    // rawMap: { filename: Uint8Array }
                    // Also wipes the old zip entry to free space.
                    async function saveExtractedBlobs(rawMap, sourceName) {
                        try {
                            const db = await openIDBv3();
                            await new Promise((res, rej) => {
                                const tx = db.transaction(
                                    [IDB_BLOBS_STORE, IDB_ZIP_STORE],
                                    "readwrite",
                                );
                                tx.objectStore(IDB_BLOBS_STORE).clear();
                                tx.objectStore(IDB_ZIP_STORE).clear();
                                tx.objectStore(IDB_BLOBS_STORE).put(
                                    sourceName || "",
                                    "_sourceName",
                                );
                                for (const [name, data] of Object.entries(rawMap)) {
                                    tx.objectStore(IDB_BLOBS_STORE).put(
                                        data,
                                        "img:" + name,
                                    );
                                }
                                tx.oncomplete = res;
                                tx.onerror = rej;
                            });
                        } catch (e) {
                            console.warn("Could not save blobs to IDB:", e);
                        }
                    }

                    // Load extracted blobs from IDB.
                    // Returns { _sourceName, filename: Uint8Array, … } or {}
                    async function loadExtractedBlobs() {
                        try {
                            const db = await openIDBv3();
                            return new Promise((res) => {
                                const tx = db.transaction(IDB_BLOBS_STORE, "readonly");
                                const result = {};
                                const req = tx.objectStore(IDB_BLOBS_STORE).openCursor();
                                req.onsuccess = (e) => {
                                    const cursor = e.target.result;
                                    if (!cursor) { res(result); return; }
                                    const key = cursor.key;
                                    if (key === "_sourceName")
                                        result._sourceName = cursor.value;
                                    else if (String(key).startsWith("img:"))
                                        result[key.slice(4)] = cursor.value;
                                    cursor.continue();
                                };
                                req.onerror = () => res({});
                            });
                        } catch (e) {
                            console.warn("Could not load blobs from IDB:", e);
                            return {};
                        }
                    }

                    // Clear blobs store (called when folder picker takes over).
                    async function clearExtractedBlobs() {
                        try {
                            const db = await openIDBv3();
                            await new Promise((res) => {
                                const tx = db.transaction(IDB_BLOBS_STORE, "readwrite");
                                tx.objectStore(IDB_BLOBS_STORE).clear();
                                tx.oncomplete = res;
                                tx.onerror = () => res();
                            });
                        } catch (e) {}
                    }

                    // Updates every .js-media-status element (settings + installer).
                    function _setMediaStatus(text, loaded) {
                        document.querySelectorAll(".js-media-status").forEach(el => {
                            el.textContent = text;
                            el.className = "anki-status js-media-status" + (loaded ? " loaded" : "");
                        });
                    }

                    // Sets a coloured border on a Firebase config textarea based on
                    // whether its content is valid parseable JSON with required keys.
                    function _fbValidateBorder(ta) {
                        if (!ta) return;
                        const v = ta.value.trim();
                        if (!v) { ta.style.border = ""; return; }
                        try {
                            let s = v.replace(/(?:const|let|var)\s+\w+\s*=\s*/, "").replace(/;$/, "").trim();
                            s = s.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
                            const cfg = JSON.parse(s);
                            if (!cfg.apiKey || !cfg.projectId) throw new Error("missing keys");
                            ta.style.border = "1.5px solid var(--accent, #3584E4)";
                        } catch (e) {
                            ta.style.border = "1.5px solid #f87171";
                        }
                    }

                    async function loadMediaFromZip(
                        arrayBuffer,
                        filename,
                        { persist = true } = {},
                    ) {
                        if (typeof fflate === "undefined") {
                            alert(
                                "Zip library failed to load. Check your internet connection and reload.",
                            );
                            return 0;
                        }

                        // Build the set of filenames we actually need from
                        // loaded txt data. If no txt has been loaded yet,
                        // neededFiles stays empty and we accept everything.
                        const neededFiles = new Set();
                        for (const map of [ankiImages, ankiImages2]) {
                            for (const entry of Object.values(map)) {
                                if (entry.personSrc) neededFiles.add(entry.personSrc);
                                if (entry.objectSrc) neededFiles.add(entry.objectSrc);
                            }
                        }

                        _setMediaStatus(`Extracting ${filename}…`);
                        // Revoke old object URLs
                        Object.values(mediaFileMap).forEach((u) => {
                            try {
                                URL.revokeObjectURL(u);
                            } catch (e) {}
                        });
                        mediaFileMap = {};

                        return new Promise((resolve) => {
                            // Use async unzip instead of unzipSync — avoids the
                            // "no callback" crash on large ZIPs and doesn't block
                            // the main thread.
                            fflate.unzip(new Uint8Array(arrayBuffer), (err, entries) => {
                                if (err) {
                                    console.error("Zip extract failed:", err);
                                    _setMediaStatus(
                                        `✗ Failed to read ${filename}: ${err.message}`,
                                    );
                                    resolve(0);
                                    return;
                                }
                                let count = 0;
                                // rawMap holds the Uint8Arrays we'll persist to IDB
                                // so restoreMedia can recreate object URLs without
                                // re-extracting the zip.
                                const rawMap = {};
                                for (const name in entries) {
                                    const lower = name.toLowerCase();
                                    if (
                                        !lower.match(
                                            /\.(jpg|jpeg|png|gif|webp|svg)$/,
                                        )
                                    )
                                        continue;
                                    // Use the basename (zip may contain folders)
                                    const base =
                                        name.split("/").pop().split("\\").pop();
                                    // Skip files not referenced by the loaded
                                    // txt data — ignores unrelated Anki media.
                                    if (neededFiles.size > 0 && !neededFiles.has(base))
                                        continue;
                                    const mime =
                                        "image/" +
                                        (lower.endsWith("png")
                                            ? "png"
                                            : lower.endsWith("gif")
                                              ? "gif"
                                              : lower.endsWith("webp")
                                                ? "webp"
                                                : lower.endsWith("svg")
                                                  ? "svg+xml"
                                                  : "jpeg");
                                    const blob = new Blob([entries[name]], { type: mime });
                                    mediaFileMap[base] = URL.createObjectURL(blob);
                                    if (persist) rawMap[base] = entries[name];
                                    count++;
                                }
                                mediaFolderName = filename;
                                if (persist) {
                                    saveExtractedBlobs(rawMap, filename).catch((e) =>
                                        console.warn(
                                            "Could not persist blobs to IDB:",
                                            e,
                                        ),
                                    );
                                }
                                saveSettings();
                                _setMediaStatus("✓ Media loaded.", true);
                                resolve(count);
                            });
                        });
                    }

                    // Wire the "Choose media folder" button + zip input
                    // + direct multi-file picker
                    (function wireMediaLoaders() {
                        const folderBtn =
                            document.getElementById("loadMediaFolderBtn");
                        const zipInput =
                            document.getElementById("mediaZipUpload");
                        if (!folderBtn || !zipInput) return;

                        // Feature-detect File System Access API
                        if (!("showDirectoryPicker" in window)) {
                            folderBtn.style.display = "none";
                        } else {
                            folderBtn.onclick = async () => {
                                try {
                                    const handle =
                                        await window.showDirectoryPicker();
                                    await loadMediaFromHandle(handle);
                                    // Clear stored blobs — folder picker takes precedence
                                    await clearExtractedBlobs();
                                } catch (e) {
                                    if (e.name !== "AbortError")
                                        alert(
                                            "Could not open folder: " +
                                                e.message,
                                        );
                                }
                            };
                        }

                        zipInput.onchange = async (e) => {
                            const f = e.target.files[0];
                            if (!f) return;
                            zipInput.disabled = true;
                            _setMediaStatus(
                                `Reading ${f.name} (${Math.round(f.size / 1024 / 1024)} MB)…`,
                            );
                            const buf = await f.arrayBuffer();
                            await loadMediaFromZip(buf, f.name);
                            zipInput.disabled = false;
                            e.target.value = "";
                        };

                        // ── Direct file picker (works on all browsers, no zip needed) ──
                        // Dynamically inject a "Select files…" button + hidden input next
                        // to the zip upload so Firefox/Safari/mobile users can pick only
                        // the images they need without zipping anything.
                        const zipLabel = zipInput.closest("label") || zipInput.parentElement;
                        if (zipLabel) {
                            const filesInput = document.createElement("input");
                            filesInput.type = "file";
                            filesInput.multiple = true;
                            filesInput.accept = "image/*";
                            filesInput.style.display = "none";
                            filesInput.id = "mediaFilesUpload";

                            const filesBtn = document.createElement("button");
                            filesBtn.type = "button";
                            filesBtn.textContent = "Select image files…";
                            filesBtn.className = "settings-btn";
                            filesBtn.title =
                                "Pick individual image files from your collection.media folder. " +
                                "Load your Anki .txt export first so only the files you need are shown.";

                            filesBtn.onclick = () => filesInput.click();

                            filesInput.onchange = (ev) => {
                                const files = Array.from(ev.target.files);
                                ev.target.value = "";
                                if (!files.length) return;

                                // Show feedback and yield so the browser can
                                // paint before the URL-creation loop runs.
                                _setMediaStatus(`Reading ${files.length} file${files.length === 1 ? "" : "s"}…`);
                                setTimeout(() => {
                                    // Build neededFiles set from loaded txts
                                    const neededFiles = new Set();
                                    for (const map of [ankiImages, ankiImages2]) {
                                        for (const entry of Object.values(map)) {
                                            if (entry.personSrc) neededFiles.add(entry.personSrc);
                                            if (entry.objectSrc) neededFiles.add(entry.objectSrc);
                                        }
                                    }

                                    // Revoke old object URLs
                                    Object.values(mediaFileMap).forEach(u => { try { URL.revokeObjectURL(u); } catch(e) {} });
                                    mediaFileMap = {};

                                    // Create object URLs synchronously (instant).
                                    const accepted = [];
                                    for (const file of files) {
                                        const lower = file.name.toLowerCase();
                                        if (!lower.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) continue;
                                        if (neededFiles.size > 0 && !neededFiles.has(file.name)) continue;
                                        mediaFileMap[file.name] = URL.createObjectURL(file);
                                        accepted.push(file);
                                    }

                                    mediaFolderName = "selected files";
                                    saveSettings();
                                    _setMediaStatus("✓ Media loaded.", true);

                                    // Persist to IDB in background — don't block the UI.
                                    if (accepted.length > 0) {
                                        Promise.all(
                                            accepted.map(f => f.arrayBuffer().then(b => [f.name, new Uint8Array(b)]))
                                        ).then(pairs => {
                                            const rawMap = Object.fromEntries(pairs);
                                            return saveExtractedBlobs(rawMap, mediaFolderName);
                                        }).catch(e => console.warn("Could not persist blobs:", e));
                                    }
                                }, 0);
                            };

                            zipLabel.appendChild(filesBtn);
                            zipLabel.parentElement.insertBefore(
                                filesInput,
                                zipLabel.nextSibling,
                            );
                        }
                    })();

                    // If Everest is currently open, re-render its images so
                    // they pick up the freshly-restored mediaFileMap. Without
                    // this, opening Everest immediately after page refresh
                    // shows no images — getImgSrc returns a non-existent
                    // path because mediaFileMap is still empty when
                    // everestRenderImages is first called.
                    function _refreshEverestImagesIfOpen() {
                        const everestModalEl =
                            document.getElementById("everestModal");
                        if (
                            !everestModalEl ||
                            everestModalEl.style.display === "none" ||
                            !everestInProgress ||
                            everestCurrentPos < 0
                        )
                            return;
                        const mode = getModeForPos(everestCurrentPos + 1);
                        const easyImgsEl =
                            document.getElementById("everestEasyImgs");
                        if (
                            easyImgsEl &&
                            everestEasyMode &&
                            easyImgsEl.style.display !== "none"
                        ) {
                            everestRenderImages(
                                easyImgsEl,
                                everestCurrentPos,
                                mode,
                            );
                        }
                        // If the answer has been revealed, also re-render the
                        // shown context panel's images.
                        const shownImgsEl =
                            document.getElementById("everestShownImgs");
                        if (shownImgsEl && everestAnswered) {
                            everestRenderImages(
                                shownImgsEl,
                                everestCurrentPos,
                                mode,
                            );
                        }
                    }

                    // Restore media on load: try folder handle first, then stored blobs
                    async function restoreMedia() {
                        let hadFolderHandle = false;
                        // 1) Folder handle (Chrome/Edge only) — only use when
                        //    permission is already granted without a user gesture.
                        if ("showDirectoryPicker" in window) {
                            try {
                                const h = await loadDirHandle();
                                if (h) {
                                    hadFolderHandle = true;
                                    const perm = await h.queryPermission({ mode: "read" });
                                    if (perm === "granted") {
                                        await loadMediaFromHandle(h);
                                        _refreshEverestImagesIfOpen();
                                        return;
                                    }
                                    // Permission "prompt"/"denied" — fall through
                                    // to blob restore; don't show reconnect warning
                                    // if blobs are available.
                                }
                            } catch (e) {
                                console.warn("Folder restore failed:", e);
                            }
                        }
                        // 2) Stored blobs — restores without re-extracting the zip
                        try {
                            const stored = await loadExtractedBlobs();
                            const keys = Object.keys(stored).filter(
                                (k) => k !== "_sourceName",
                            );
                            if (keys.length === 0) {
                                if (hadFolderHandle) {
                                    _setMediaStatus(
                                        `⚠ ${mediaFolderName || "folder"} — click "Choose media folder" to reconnect`,
                                    );
                                } else {
                                    _setMediaStatus("No media selected.");
                                }
                                return;
                            }
                            Object.values(mediaFileMap).forEach((u) => {
                                try { URL.revokeObjectURL(u); } catch (e) {}
                            });
                            mediaFileMap = {};
                            for (const name of keys) {
                                const data = stored[name];
                                const lower = name.toLowerCase();
                                const mime =
                                    "image/" +
                                    (lower.endsWith("png")
                                        ? "png"
                                        : lower.endsWith("gif")
                                          ? "gif"
                                          : lower.endsWith("webp")
                                            ? "webp"
                                            : lower.endsWith("svg")
                                              ? "svg+xml"
                                              : "jpeg");
                                mediaFileMap[name] = URL.createObjectURL(
                                    new Blob([data], { type: mime }),
                                );
                            }
                            mediaFolderName =
                                stored._sourceName || `${keys.length} files`;
                            saveSettings();
                            _setMediaStatus("✓ Media loaded.", true);
                            _refreshEverestImagesIfOpen();
                        } catch (e) {
                            console.warn("Blob restore failed:", e);
                        }
                    }

                    // Excel Upload
                    document.getElementById("excelFileUpload").onchange = (
                        e,
                    ) => {
                        const f = e.target.files[0];
                        if (!f) return;
                        const r = new FileReader();
                        r.onload = (ev) => {
                            const wb = XLSX.read(
                                new Uint8Array(ev.target.result),
                                { type: "array" },
                            );
                            const data = XLSX.utils.sheet_to_json(
                                wb.Sheets[wb.SheetNames[0]],
                                { header: "A", defval: "" },
                            );
                            const tP = {},
                                tA = {},
                                tO = {};
                            const c = excelColumnConfig;
                            data.forEach((row, i) => {
                                if (i === 0) return;
                                // Normalise the number — Excel often stores it as a float ("0.0", "999.0")
                                const raw = row[c.numCol];
                                if (raw === undefined || raw === null) return;
                                const n = String(parseInt(raw, 10));
                                // Skip non-numeric entries (e.g. section dividers like "-")
                                // and the explicit "NaN" string from parseInt failures.
                                if (n === "NaN" || !/^\d+$/.test(n)) return;
                                const numStr3 = n.padStart(3, "0"),
                                    numStr2 = n.padStart(2, "0");
                                if (row[c.person3Col])
                                    tP[numStr3] = row[c.person3Col];
                                if (row[c.person2Col])
                                    tP[numStr2] = row[c.person2Col];
                                if (row[c.action2Col]) {
                                    // 2-digit action key = last 2 digits of the number
                                    // (shared between 2-2-2 and 3-2-3 modes)
                                    const aN = n.length > 2 ? n.slice(-2) : n;
                                    tA[aN.padStart(2, "0")] = row[c.action2Col];
                                }
                                if (row[c.object3Col])
                                    tO[numStr3] = row[c.object3Col];
                                if (row[c.object2Col])
                                    tO[numStr2] = row[c.object2Col];
                            });
                            excelPersonList = tP;
                            excelActionList = tA;
                            excelObjectList = tO;
                            saveSettings();
                            instExcelLoaded = true;
                            // Also push the parsed values into the
                            // installer textareas (in case the user
                            // opens / re-opens the installer later) and
                            // re-apply the validation UI so the green/red
                            // borders are immediately visible.
                            if (typeof _syncInstallerTextareasFromExcel === "function")
                                _syncInstallerTextareasFromExcel();
                            if (typeof _updateInstallerPaoValidation === "function")
                                _updateInstallerPaoValidation();
                            if (typeof _installerUpdateNextButton === "function")
                                _installerUpdateNextButton();
                            const exStatus = document.getElementById(
                                "instExcelStatus",
                            );
                            if (exStatus) {
                                exStatus.textContent = "✓ Excel loaded";
                                exStatus.className = "anki-status loaded";
                            }
                            alert("Excel Data Loaded!");
                        };
                        r.readAsArrayBuffer(f);
                        e.target.value = "";
                    };

                    // Background Image Upload
                    document.getElementById("backgroundImageUpload").onchange =
                        (e) => {
                            const f = e.target.files[0];
                            if (!f) return;
                            if (f.size > MAX_IMAGE_SIZE_BYTES) {
                                alert("Too big!");
                                return;
                            }
                            const r = new FileReader();
                            r.onload = (ev) => {
                                const i = new Image();
                                i.onload = () => {
                                    const c = document.createElement("canvas");
                                    c.width = i.width;
                                    c.height = i.height;
                                    c.getContext("2d").drawImage(i, 0, 0);
                                    _storage.setItem(
                                        "customBackgroundImage",
                                        c.toDataURL("image/jpeg", 0.7),
                                    );
                                    document.getElementById(
                                        "useCustomBackground",
                                    ).checked = true;
                                    saveSettings();
                                    alert("Background set!");
                                };
                                i.src = ev.target.result;
                            };
                            r.readAsDataURL(f);
                            e.target.value = "";
                        };

                    // Volume Controls
                    function updateVolUI() {
                        if (volSlider)
                            volSlider.value = Math.round(volume * 10);
                        saveSettings();
                    }
                    if (volSlider) {
                        volSlider.addEventListener("input", () => {
                            volume = parseInt(volSlider.value) / 10;
                            saveSettings();
                        });
                    }

                    // Day offset slider live update
                    const daySlider =
                        document.getElementById("dayOffsetSlider");
                    if (daySlider) {
                        daySlider.addEventListener("input", () => {
                            dayOffsetHours = parseInt(daySlider.value);
                            document.getElementById(
                                "dayOffsetLabel",
                            ).textContent = dayOffsetHours;
                        });
                        daySlider.addEventListener("change", () => {
                            saveSettings();
                            srsUpdateBadge();
                            statsRefreshDisplay();
                        });
                    }

                    // Hotkeys
                    document.addEventListener("keydown", (e) => {
                        // While the setup installer is open, suppress
                        // all hotkeys so the user can type into its
                        // textareas without triggering things like
                        // Everest (E) or Hint (W) on the page behind.
                        const installerEl =
                            document.getElementById("welcomeModal");
                        if (
                            installerEl &&
                            installerEl.style.display === "flex"
                        ) {
                            return;
                        }

                        const statsModalEl =
                            document.getElementById("statsModal");
                        const srsSettingsModalEl =
                            document.getElementById("srsSettingsModal");

                        if (e.key === "Escape") {
                            if (
                                srsSettingsModalEl &&
                                srsSettingsModalEl.style.display === "block"
                            ) {
                                const rmEl =
                                    document.getElementById("srsRawMode");
                                if (rmEl) {
                                    srsRawMode = rmEl.checked;
                                    saveSettings();
                                }
                                srsSettingsModalEl.style.display = "none";
                            } else if (srsModal.style.display === "block") {
                                if (_srsCountdownTimer)
                                    clearInterval(_srsCountdownTimer);
                                srsModal.style.display = "none";
                                imagesModal.style.display = "block";
                                displayList(true);
                            } else if (
                                practiceModal.style.display === "block"
                            ) {
                                practiceModal.style.display = "none";
                                imagesModal.style.display = "block";
                                displayList(true);
                            } else if (everestModal.style.display === "block") {
                                everestModal.style.display = "none";
                                imagesModal.style.display = "block";
                                displayList(true);
                            } else if (
                                statsModalEl &&
                                statsModalEl.style.display === "block"
                            ) {
                                statsModalEl.style.display = "none";
                                piInput.focus();
                            } else if (imagesModal.style.display === "block") {
                                imagesModal.style.display = "none";
                                piInput.focus();
                            } else if (
                                settingsModal.style.display === "block"
                            ) {
                                settingsModal.style.display = "none";
                                piInput.focus();
                            }
                            return;
                        }

                        // While Everest is open, handle Enter for next round and prevent other hotkeys
                        if (everestModal.style.display === "block") {
                            // Enter on answer screen advances to next round
                            // (input is disabled after submit, so input-level handler won't fire)
                            if (e.key === "Enter" && everestAnswered) {
                                e.preventDefault();
                                everestNewRound();
                                return;
                            }
                            // E key closes Everest and goes to main screen.
                            if (e.key.toUpperCase() === everestHotkey) {
                                e.preventDefault();
                                everestModal.style.display = "none";
                                piInput.focus();
                                return;
                            }
                            return;
                        }

                        if (practiceModal.style.display === "block") {
                            if (
                                !isReviewMode &&
                                (e.key === "ArrowLeft" ||
                                    e.key === "a" ||
                                    e.key === "A")
                            )
                                handleNav(-1);
                            if (
                                !isReviewMode &&
                                (e.key === "ArrowRight" ||
                                    e.key === "d" ||
                                    e.key === "D")
                            )
                                handleNav(1);
                            if (
                                !isReviewMode &&
                                (e.key === " " || e.key === "Enter")
                            ) {
                                e.preventDefault();
                                handleNav(1);
                            }
                            if (e.key.toUpperCase() === browseHotkey) {
                                practiceModal.style.display = "none";
                                piInput.focus();
                            }
                            // 1-4: rate the card at the current browse position.
                            // The rating only counts as a review in the stats
                            // if the card was currently due (srsIsDue). The
                            // cap in srsRate already prevents the due date
                            // from being pushed further out for not-yet-due
                            // cards, so we don't need to add extra guards here.
                            const _ratingKey =
                                e.key === "1"
                                    ? 1
                                    : e.key === "2"
                                      ? 2
                                      : e.key === "3"
                                        ? 3
                                        : e.key === "4"
                                          ? 4
                                          : 0;
                            if (_ratingKey) {
                                e.preventDefault();
                                const _pos = practiceIndex;
                                // Bail if the user spams the same rating at the
                                // same position — mirrors the A/H hotkey guard
                                // and avoids creating a flood of identical
                                // undo entries.
                                const _last = browseRateHistory[
                                    browseRateHistory.length - 1
                                ];
                                if (
                                    _last &&
                                    _last.pos === _pos &&
                                    _last.rating === _ratingKey
                                ) {
                                    const _dupLabel =
                                        _ratingKey === 1
                                            ? "Again"
                                            : _ratingKey === 2
                                              ? "Hard"
                                              : _ratingKey === 3
                                                ? "Good"
                                                : "Easy";
                                    showToast(
                                        `Image #${posToGroupNum(_pos) + 1} already rated as ${_dupLabel}`,
                                    );
                                    return;
                                }
                                const _isDue = srsIsDue(_pos);
                                const _oldCard = srsData[_pos]
                                    ? { ...srsData[_pos] }
                                    : null;
                                browseRateHistory.push({
                                    pos: _pos,
                                    oldCard: _oldCard,
                                    isDue: _isDue,
                                    rating: _ratingKey,
                                });
                                if (browseRateHistory.length > 20)
                                    browseRateHistory.shift();
                                browseRateRedo = [];
                                srsRate(_pos, _ratingKey, _isDue);
                                srsUpdateBadge();
                                saveSettings();
                                const _ratingLabel =
                                    _ratingKey === 1
                                        ? "Again"
                                        : _ratingKey === 2
                                          ? "Hard"
                                          : _ratingKey === 3
                                            ? "Good"
                                            : "Easy";
                                showToast(
                                    `Card rated ${_ratingLabel} (image #${posToGroupNum(_pos) + 1})`,
                                );
                                // In review mode, auto-advance to the next card.
                                if (isReviewMode) handleNav(1);
                            }
                            // Ctrl/Cmd+Z: undo last browse-modal rating.
                            if (
                                (e.ctrlKey || e.metaKey) &&
                                e.key === "z"
                            ) {
                                e.preventDefault();
                                if (browseRateHistory.length > 0) {
                                    const _undo = browseRateHistory.pop();
                                    browseRateRedo.push({
                                        pos: _undo.pos,
                                        newCard: srsData[_undo.pos]
                                            ? { ...srsData[_undo.pos] }
                                            : null,
                                        isDue: _undo.isDue,
                                        rating: _undo.rating,
                                    });
                                    if (browseRateRedo.length > 20)
                                        browseRateRedo.shift();
                                    if (_undo.oldCard)
                                        srsData[_undo.pos] = _undo.oldCard;
                                    else delete srsData[_undo.pos];
                                    if (_undo.isDue) {
                                        const _today = srsToday();
                                        if (dailyReviewStats[_today] > 0)
                                            dailyReviewStats[_today]--;
                                    }
                                    srsUpdateBadge();
                                    saveSettings();
                                    const _ratingLabel =
                                        _undo.rating === 1
                                            ? "Again"
                                            : _undo.rating === 2
                                              ? "Hard"
                                              : _undo.rating === 3
                                                ? "Good"
                                                : "Easy";
                                    showToast(
                                        `↩ Image #${posToGroupNum(_undo.pos) + 1} rating undone (was ${_ratingLabel})`,
                                    );
                                }
                            }
                            // Ctrl/Cmd+Y: redo a previously-undone browse-modal rating.
                            if (
                                (e.ctrlKey || e.metaKey) &&
                                e.key === "y"
                            ) {
                                e.preventDefault();
                                if (browseRateRedo.length > 0) {
                                    const _redo = browseRateRedo.pop();
                                    const _oldCardNow = srsData[_redo.pos]
                                        ? { ...srsData[_redo.pos] }
                                        : null;
                                    browseRateHistory.push({
                                        pos: _redo.pos,
                                        oldCard: _oldCardNow,
                                        isDue: _redo.isDue,
                                        rating: _redo.rating,
                                    });
                                    if (browseRateHistory.length > 20)
                                        browseRateHistory.shift();
                                    if (_redo.newCard)
                                        srsData[_redo.pos] = _redo.newCard;
                                    else delete srsData[_redo.pos];
                                    if (_redo.isDue) {
                                        const _today = srsToday();
                                        dailyReviewStats[_today] =
                                            (dailyReviewStats[_today] || 0) + 1;
                                    }
                                    srsUpdateBadge();
                                    saveSettings();
                                    const _ratingLabel =
                                        _redo.rating === 1
                                            ? "Again"
                                            : _redo.rating === 2
                                              ? "Hard"
                                              : _redo.rating === 3
                                                ? "Good"
                                                : "Easy";
                                    showToast(
                                        `↪ Image #${posToGroupNum(_redo.pos) + 1} rating redone (${_ratingLabel})`,
                                    );
                                }
                            }
                        } else if (!testMode) {
                            const anyModalOpen = [
                                settingsModal,
                                imagesModal,
                                srsModal,
                                everestModal,
                                statsModalEl,
                                srsSettingsModalEl,
                            ].some((m) => m && m.style.display === "block");

                            // Stats hotkey: toggle open/close
                            if (
                                !anyModalOpen ||
                                (statsModalEl &&
                                    statsModalEl.style.display === "block")
                            ) {
                                if (e.key.toUpperCase() === statsHotkey) {
                                    e.preventDefault();
                                    if (statsModalEl) {
                                        if (
                                            statsModalEl.style.display ===
                                            "block"
                                        ) {
                                            statsModalEl.style.display = "none";
                                            piInput.focus();
                                        } else if (!anyModalOpen) {
                                            statsModalEl.style.display =
                                                "block";
                                            statsRefreshDisplay();
                                        }
                                    }
                                    return;
                                }
                            }

                            // Review hotkey toggle: R closes SRS modal if it's open
                            if (
                                !anyModalOpen ||
                                srsModal.style.display === "block"
                            ) {
                                if (
                                    e.key.toUpperCase() === reviewHotkey &&
                                    srsModal.style.display === "block"
                                ) {
                                    e.preventDefault();
                                    if (_srsCountdownTimer)
                                        clearInterval(_srsCountdownTimer);
                                    srsModal.style.display = "none";
                                    piInput.focus();
                                    return;
                                }
                            }

                            // List hotkey: toggle images/list modal (works even when list is open)
                            if (
                                !anyModalOpen ||
                                imagesModal.style.display === "block"
                            ) {
                                if (e.key.toUpperCase() === listHotkey) {
                                    e.preventDefault();
                                    if (imagesModal.style.display === "block") {
                                        imagesModal.style.display = "none";
                                        piInput.focus();
                                    } else if (!anyModalOpen) {
                                        imagesModal.style.display = "block";
                                        displayList(true);
                                    }
                                    return;
                                }
                            }

                            if (!anyModalOpen) {
                                if (e.key.toUpperCase() === hintHotkey) {
                                    e.preventDefault();
                                    showHintLogic();
                                }
                                if (e.key.toUpperCase() === revealHotkey) {
                                    e.preventDefault();
                                    showRevealLogic();
                                }
                                if (e.key.toUpperCase() === imgHotkey) {
                                    e.preventDefault();
                                    showImageLogic();
                                }
                                // Review hotkey: directly open SRS modal
                                if (e.key.toUpperCase() === reviewHotkey) {
                                    e.preventDefault();
                                    srsOpenModal();
                                }
                                if (e.key.toUpperCase() === browseHotkey) {
                                    e.preventDefault();
                                    if (currentInputLength > 0) {
                                        const lastTypedPos =
                                            sequenceStartIndex +
                                            currentInputLength -
                                            1;
                                        practiceIndex =
                                            snapToGroupStart(lastTypedPos);
                                        saveSettings();
                                    }
                                    imagesModal.style.display = "none";
                                    openFlashcards(practiceIndex);
                                }
                                // Everest hotkey: toggle Everest modal
                                if (e.key.toUpperCase() === everestHotkey) {
                                    e.preventDefault();
                                    if (everestModal.style.display === "block") {
                                        everestModal.style.display = "none";
                                        piInput.focus();
                                        return;
                                    }
                                    // Reuse everestButton logic directly
                                    imagesModal.style.display = "none";
                                    everestModal.style.display = "block";
                                    everestRefreshHSDisplay();
                                    if (
                                        everestInProgress &&
                                        everestCurrentPos >= 0
                                    ) {
                                        document.getElementById(
                                            "everestSetup",
                                        ).style.display = "none";
                                        document.getElementById(
                                            "everestGame",
                                        ).style.display = "block";
                                        document.getElementById(
                                            "everestScore",
                                        ).textContent = everestScore;
                                        everestRenderCurrentQuestion();
                                    } else {
                                        document.getElementById(
                                            "everestSetup",
                                        ).style.display = "block";
                                        document.getElementById(
                                            "everestGame",
                                        ).style.display = "none";
                                        document.getElementById(
                                            "everestFromPos",
                                        ).value = everestFromDigit;
                                        document.getElementById(
                                            "everestToPos",
                                        ).value = everestToDigit;
                                        everestUpdateRangeInfo();
                                    }
                                }
                                // Mistake hotkey: add current chunk to SRS as Again, show PAO toast
                                if (
                                    e.key.toUpperCase() === mistakeHotkey &&
                                    currentInputLength > 0 &&
                                    currentTypingChunkPos >= 0
                                ) {
                                    e.preventDefault();
                                    const mistakePos = currentTypingChunkPos;
                                    // Check if already marked as Again
                                    if (currentChunkLastRating === 1) {
                                        const _mode2 = getModeForPos(mistakePos + 1);
                                        const _gSize2 = getGroupSizeForMode(_mode2);
                                        const digits2 = PI_DIGITS.slice(mistakePos, mistakePos + _gSize2);
                                        showToast(`${digits2} already rated as Again`);
                                        return;
                                    }
                                    // Clear redo stack on new action
                                    mistakeRedoStack = [];
                                    // Save old state for Ctrl+Z undo
                                    const _mode = getModeForPos(mistakePos + 1);
                                    const _gSize = getGroupSizeForMode(_mode);
                                    const digits = PI_DIGITS.slice(
                                        mistakePos,
                                        mistakePos + _gSize,
                                    );
                                    // Snapshot the card state before rating so
                                    // undo can restore it.
                                    const _oldCardAgain = srsData[mistakePos]
                                        ? { ...srsData[mistakePos] }
                                        : null;
                                    // Ensure card exists, then rate Again
                                    if (!srsData[mistakePos]) {
                                        srsData[mistakePos] = {
                                            interval: 0,
                                            easeFactor: 2.5,
                                            dueDate: srsToday(),
                                            reviews: 0,
                                            lapses: 0,
                                            step: 0,
                                        };
                                    }
                                    const _countedAsReview = srsRate(mistakePos, 1, srsIsDue(mistakePos)); // Again
                                    mistakeUndoStack.push({
                                        pos: mistakePos,
                                        oldCard: _oldCardAgain,
                                        digits,
                                        rating: 1,
                                        countedAsReview: _countedAsReview,
                                    });
                                    if (mistakeUndoStack.length > 20)
                                        mistakeUndoStack.shift();
                                    currentChunkMistakePressed = true;
                                    currentChunkLastRating = 1;
                                    srsUpdateBadge();
                                    // Toast showing PAO names
                                    const paoD = getPAOGroupDataByPos(
                                        mistakePos,
                                        _mode,
                                    );
                                    const paoStr = paoD
                                        ? `${paoD.pTerm} / ${paoD.aTerm} / ${paoD.oTerm}`
                                        : `chunk at #${mistakePos + 1}`;
                                    showToast(` ${digits} rated as Again`);
                                }
                                // H hotkey: add current chunk to SRS as Hard, show PAO toast
                                if (
                                    e.key.toUpperCase() === hardHotkey &&
                                    currentInputLength > 0 &&
                                    currentTypingChunkPos >= 0
                                ) {
                                    e.preventDefault();
                                    const mistakePos = currentTypingChunkPos;
                                    // Check if already marked as Hard
                                    if (currentChunkLastRating === 4) {
                                        const _mode2 = getModeForPos(mistakePos + 1);
                                        const _gSize2 = getGroupSizeForMode(_mode2);
                                        const digits2 = PI_DIGITS.slice(mistakePos, mistakePos + _gSize2);
                                        showToast(`${digits2} already rated as Hard`);
                                        return;
                                    }
                                    mistakeRedoStack = [];
                                    const _mode = getModeForPos(mistakePos + 1);
                                    const _gSize = getGroupSizeForMode(_mode);
                                    const digits = PI_DIGITS.slice(
                                        mistakePos,
                                        mistakePos + _gSize,
                                    );
                                    // Snapshot the card state before rating so
                                    // undo can restore it.
                                    const _oldCardHard = srsData[mistakePos]
                                        ? { ...srsData[mistakePos] }
                                        : null;
                                    if (!srsData[mistakePos]) {
                                        srsData[mistakePos] = {
                                            interval: 0,
                                            easeFactor: 2.5,
                                            dueDate: srsToday(),
                                            reviews: 0,
                                            lapses: 0,
                                            step: 0,
                                        };
                                    }
                                    const _countedAsReview = srsRate(mistakePos, 4, srsIsDue(mistakePos)); // Hard
                                    mistakeUndoStack.push({
                                        pos: mistakePos,
                                        oldCard: _oldCardHard,
                                        digits,
                                        rating: 4,
                                        countedAsReview: _countedAsReview,
                                    });
                                    if (mistakeUndoStack.length > 20)
                                        mistakeUndoStack.shift();
                                    currentChunkMistakePressed = true;
                                    currentChunkLastRating = 4;
                                    srsUpdateBadge();
                                    const paoD = getPAOGroupDataByPos(
                                        mistakePos,
                                        _mode,
                                    );
                                    showToast(` ${digits} rated as Hard`);
                                }
                                // Ctrl+Z to undo last outside-SRS mistake
                                if (
                                    (e.ctrlKey || e.metaKey) &&
                                    e.key === "z" &&
                                    !srsModal.style.display.includes("block")
                                ) {
                                    e.preventDefault();
                                    if (mistakeUndoStack.length > 0) {
                                        const undo = mistakeUndoStack.pop();
                                        // Save current state for redo
                                        mistakeRedoStack.push({
                                            pos: undo.pos,
                                            newCard: srsData[undo.pos]
                                                ? { ...srsData[undo.pos] }
                                                : null,
                                            rating: undo.rating,
                                            digits: undo.digits,
                                            countedAsReview:
                                                undo.countedAsReview,
                                        });
                                        if (mistakeRedoStack.length > 20)
                                            mistakeRedoStack.shift();
                                        // Restore old card or remove
                                        if (undo.oldCard)
                                            srsData[undo.pos] = undo.oldCard;
                                        else delete srsData[undo.pos];
                                        // Undo the review stat increment
                                        // only if the original rating counted
                                        // as a review (i.e. the card was in the
                                        // review deck at the time).
                                        if (undo.countedAsReview) {
                                            const _today = srsToday();
                                            if (dailyReviewStats[_today] > 0)
                                                dailyReviewStats[_today]--;
                                        }
                                        srsUpdateBadge();
                                        saveSettings();
                                        const d = undo.digits || "chunk";
                                        const ratingLabel = undo.rating === 4 ? "Hard" : "Again";
                                        showToast(
                                            `↩ ${d} unrated (was ${ratingLabel})`,
                                        );
                                    }
                                }
                                // Ctrl+Y to redo a mistake undo
                                if (
                                    (e.ctrlKey || e.metaKey) &&
                                    e.key === "y" &&
                                    !srsModal.style.display.includes("block")
                                ) {
                                    e.preventDefault();
                                    if (mistakeRedoStack.length > 0) {
                                        const redo = mistakeRedoStack.pop();
                                        // Save for undo
                                        const _mode = getModeForPos(
                                            redo.pos + 1,
                                        );
                                        const _gSize = getGroupSizeForMode(
                                            _mode,
                                        );
                                        const digits = PI_DIGITS.slice(
                                            redo.pos,
                                            redo.pos + _gSize,
                                    );
                                    // Snapshot the (about-to-be-restored) state
                                    // so the next undo can roll it back.
                                    mistakeUndoStack.push({
                                        pos: redo.pos,
                                        oldCard: srsData[redo.pos]
                                            ? { ...srsData[redo.pos] }
                                            : null,
                                        digits,
                                        rating: redo.rating,
                                        countedAsReview:
                                            redo.countedAsReview,
                                    });
                                    if (mistakeUndoStack.length > 20)
                                        mistakeUndoStack.shift();
                                        // Restore the rated card
                                        if (redo.newCard)
                                            srsData[redo.pos] = redo.newCard;
                                        else delete srsData[redo.pos];
                                        // Re-apply the review stat only if
                                        // the original rating counted.
                                        if (redo.countedAsReview) {
                                            const _today = srsToday();
                                            dailyReviewStats[_today] =
                                                (dailyReviewStats[_today] || 0) + 1;
                                        }
                                        srsUpdateBadge();
                                        saveSettings();
                                        const ratingLabel = redo.rating === 4 ? "Hard" : "Again";
                                        showToast(
                                            `↪ ${digits} re-rated as ${ratingLabel}`,
                                        );
                                    }
                                }
                            }
                        }
                    });

                    initAudioContext();
                    loadSettings();
                    console.log("App Ready");
                    piInput.focus();

                    // Restore media (folder handle → stored zip) without blocking init
                    restoreMedia();

                    // Wire the help button to open the GitHub README in a new tab.
                    const helpBtn = document.getElementById("helpBtn");
                    if (helpBtn)
                        helpBtn.addEventListener("click", () =>
                            window.open(
                                "https://github.com/xiorter/pi-pao-practice/blob/master/README.md",
                                "_blank",
                                "noopener",
                            ),
                        );

                    // Wire the "Run setup wizard" button in Settings.
                    const runInstallerBtn =
                        document.getElementById("runInstallerBtn");
                    if (runInstallerBtn)
                        runInstallerBtn.addEventListener("click", () => {
                            if (settingsModal)
                                settingsModal.style.display = "none";
                            openInstaller(0);
                        });

                    // Hide the Media folder path setting on non-local origins
                    // (it's only useful when running this app from disk or a
                    // local dev server).
                    const ankiPathInput =
                        document.getElementById("ankiMediaPathInput");
                    if (ankiPathInput && !_isLocalDev()) {
                        const wrap = ankiPathInput.closest(".setting-row");
                        if (wrap) wrap.style.display = "none";
                    }
                    // Update the "Load media" label to reflect folder-picker support
                    _updateLoadMediaLabel();

                    // First-run installer
                    if (localStorage.getItem("piPaoOnboarded") !== "1") {
                        openInstaller(0);
                    }
                }

                // ────────────────────────────────────────────────────────────
                // Installer modal (first-run + re-openable via the ? button)
                // ────────────────────────────────────────────────────────────
                let _installerStep = 0;
                // Tracks whether a valid Excel file has been uploaded during the
                // current installer run. Used to gate the PAO Source → Next button
                // when the Excel option is selected. Reset to false when the
                // installer is (re-)opened.
                let instExcelLoaded = false;
                const _INSTALLER_STEPS = [
                    "appearance",
                    "paoSource",
                    "paoRanges",
                    "ankiImages",
                    "cloudSync",
                ];

                function openInstaller(stepIdx) {
                    const modal = document.getElementById("welcomeModal");
                    if (!modal) return;
                    _installerStep = Math.max(
                        0,
                        Math.min(
                            stepIdx | 0,
                            _INSTALLER_STEPS.length - 1,
                        ),
                    );
                    // Reset per-run state for the PAO Source validation
                    instExcelLoaded = false;
                    modal.style.display = "flex";
                    renderInstallerStep();
                }
                function closeInstaller() {
                    const modal = document.getElementById("welcomeModal");
                    if (!modal) return;
                    modal.style.display = "none";
                    // One-shot: any close (Done / Skip / ✕) marks the installer
                    // as done so it doesn't auto-open on subsequent visits.
                    // The user can re-open it via Settings → Run setup wizard.
                    localStorage.setItem("piPaoOnboarded", "1");
                }

                function renderInstallerStep() {
                    const body = document.getElementById("installerBody");
                    const label = document.getElementById(
                        "installerStepLabel",
                    );
                    const progress =
                        document.getElementById("installerProgress");
                    const back = document.getElementById("installerBackBtn");
                    const next = document.getElementById("installerNextBtn");
                    const skip = document.getElementById("installerSkipBtn");
                    const titleEl =
                        document.getElementById("installerStepTitle");
                    if (!body || !label || !progress) return;

                    const step = _INSTALLER_STEPS[_installerStep];
                    const total = _INSTALLER_STEPS.length;
                    const pct = ((_installerStep + 1) / total) * 100;
                    progress.style.width = pct + "%";
                    label.textContent = `Step ${_installerStep + 1} of ${total}`;
                    if (titleEl)
                        titleEl.textContent = _INSTALLER_TITLES[step] || "";

                    // Back hidden on first step
                    back.style.visibility =
                        _installerStep === 0 ? "hidden" : "visible";

                    // Last step: Next → Done; otherwise Next →
                    if (_installerStep === total - 1) {
                        next.textContent = "Done";
                    } else {
                        next.textContent = "Next →";
                    }
                    // Skip: visible for the two optional steps (anki, cloud)
                    skip.style.display =
                        step === "ankiImages" || step === "cloudSync"
                            ? ""
                            : "none";

                    // Render the step body
                    body.innerHTML = "";
                    if (step === "appearance") renderInstallerAppearance(body);
                    else if (step === "paoSource")
                        renderInstallerPaoSource(body);
                    else if (step === "paoRanges")
                        renderInstallerPaoRanges(body);
                    else if (step === "ankiImages")
                        renderInstallerAnkiImages(body);
                    else if (step === "cloudSync")
                        renderInstallerCloudSync(body);

                    // Update the Next/Done button state (some steps gate Next)
                    _installerUpdateNextButton();
                }

                // Enable/disable the Next (or Done) button based on the
                // current step's validity. Currently the only gating step
                // is PAO Source: Excel needs a successful upload, Textarea
                // needs all three textareas to pass validation.
                function _installerUpdateNextButton() {
                    const nextBtn = document.getElementById("installerNextBtn");
                    if (!nextBtn) return;
                    const step = _INSTALLER_STEPS[_installerStep];
                    let canProceed = true;
                    if (step === "cloudSync") {
                        // Done is disabled until Firebase is actually connected.
                        canProceed = _fbDb !== null;
                    } else if (step === "ankiImages") {
                        const hasTxt =
                            Object.keys(ankiImages).length > 0 ||
                            Object.keys(ankiImages2).length > 0;
                        const hasMedia = Object.keys(mediaFileMap).length > 0;
                        // Next is disabled only when the user has done nothing at all.
                        // If they've uploaded at least a txt OR some media, allow Next.
                        canProceed = hasMedia;
                    } else if (step === "paoSource") {
                        // Radio buttons are gone — paoDataSource is always
                        // "textarea" in the installer. Validate the three lists.
                        const r = _validatePaoLists(
                            personList,
                            actionList,
                            objectList,
                        );
                        const hasPerson = r.person2 !== null || r.person3 !== null;
                        const hasAction = r.action !== null;
                        const hasObject = r.object2 !== null || r.object3 !== null;
                        const allNonNullOk = [r.person2, r.person3, r.action, r.object2, r.object3]
                            .filter(s => s !== null)
                            .every(s => s.ok);
                        canProceed = hasPerson && hasAction && hasObject && allNonNullOk;
                    }
                    nextBtn.disabled = !canProceed;
                    nextBtn.style.opacity = canProceed ? "" : "0.5";
                    nextBtn.style.cursor = canProceed ? "" : "not-allowed";
                    nextBtn.title = canProceed
                        ? ""
                        : "Complete the required fields to continue.";
                }

                // Per-slide titles shown above each step's body.
                const _INSTALLER_TITLES = {
                    appearance: "Appearance",
                    paoSource: "PAO Source",
                    paoRanges: "PAO Range",
                    ankiImages: "Anki Images",
                    cloudSync: "Cloud Sync",
                };

                // Tiny helper: build a labelled row (label on the left, controls on the right).
                function _installerRow(label, controlHtml, hint) {
                    const row = document.createElement("div");
                    row.className = "setting-row";
                    row.style.cssText = "margin:6px 0;";
                    if (label) {
                        const lab = document.createElement("label");
                        lab.style.cssText =
                            "min-width:90px;color:var(--modal-text-muted);";
                        lab.textContent = label;
                        row.appendChild(lab);
                    }
                    const inner = document.createElement("div");
                    inner.style.cssText =
                        "display:flex;gap:8px;align-items:center;flex-wrap:wrap;flex:1;";
                    inner.innerHTML = controlHtml;
                    row.appendChild(inner);
                    if (hint) {
                        const h = document.createElement("div");
                        h.style.cssText =
                            "flex-basis:100%;font-size:0.8rem;color:var(--modal-text-muted);";
                        h.textContent = hint;
                        row.appendChild(h);
                    }
                    return row;
                }
                function _installerP(text) {
                    const p = document.createElement("p");
                    p.style.cssText =
                        "text-align:left;font-size:0.9rem;color:var(--modal-text-muted);margin:4px 0 10px;";
                    p.textContent = text;
                    return p;
                }
                // Variant of _installerP that takes an innerHTML string (for links).
                function _installerPHtml(html) {
                    const p = document.createElement("p");
                    p.style.cssText =
                        "text-align:left;font-size:0.9rem;color:var(--modal-text-muted);margin:4px 0 10px;";
                    p.innerHTML = html;
                    return p;
                }

                // ── Live preview helper for the Appearance step ──
                // Called on every change in the step 1 inputs so the user
                // sees their changes instantly without clicking Next.
                function _installerAppearanceLive() {
                    const dark = document.getElementById("instDarkMode");
                    const c = document.getElementById("instCorrect");
                    const ic = document.getElementById("instIncorrect");
                    const a = document.getElementById("instAccent");
                    const bg = document.getElementById("instBg");
                    if (dark) {
                        darkMode = dark.checked;
                        document.body.classList.toggle("dark-mode", darkMode);
                    }
                    if (c) correctColor = c.value;
                    if (ic) incorrectColor = ic.value;
                    if (a) accentColor = a.value;
                    if (bg) {
                        currentBackgroundColor = bg.value;
                        document.body.style.backgroundColor =
                            currentBackgroundColor;
                    }
                    applyAccentColor();
                    // Also re-render the heatmap & pi-coverage so the scheme
                    // pickers + accent apply immediately.
                    if (typeof renderHeatmap === "function") renderHeatmap();
                    if (typeof renderPiCoverage === "function")
                        renderPiCoverage();
                }

                // Step 1: Appearance — mirrors Settings → Appearance.
                function renderInstallerAppearance(body) {
                    const dark = document.createElement("div");
                    dark.className = "setting-row";
                    dark.innerHTML = `<label style="cursor:pointer"><input type="checkbox" id="instDarkMode" ${
                        document.body.classList.contains("dark-mode")
                            ? "checked"
                            : ""
                    }> Dark mode (menus)</label>`;
                    body.appendChild(dark);
                    body.appendChild(
                        _installerRow(
                            "Correct:",
                            `<input type="color" id="instCorrect" value="${correctColor}">`,
                        ),
                    );
                    body.appendChild(
                        _installerRow(
                            "Incorrect:",
                            `<input type="color" id="instIncorrect" value="${incorrectColor}">`,
                        ),
                    );
                    body.appendChild(
                        _installerRow(
                            "Accent:",
                            `<input type="color" id="instAccent" value="${accentColor}">`,
                        ),
                    );
                    body.appendChild(
                        _installerRow(
                            "Background:",
                            `<input type="color" id="instBg" value="${currentBackgroundColor}">`,
                        ),
                    );
                    // Live-preview wiring: every change updates the live app.
                    setTimeout(() => {
                        const wire = (id, ev) => {
                            const el = document.getElementById(id);
                            if (el)
                                el.addEventListener(ev, () =>
                                    _installerAppearanceLive(),
                                );
                        };
                        wire("instDarkMode", "change");
                        wire("instCorrect", "input");
                        wire("instIncorrect", "input");
                        wire("instAccent", "input");
                        wire("instBg", "input");
                    }, 0);
                }
                function _saveInstallerAppearance() {
                    _installerAppearanceLive();
                    // Mirror into the main settings inputs
                    const sCorrect =
                        document.getElementById("correctColorPicker");
                    if (sCorrect) sCorrect.value = correctColor;
                    const sInc =
                        document.getElementById("incorrectColorPicker");
                    if (sInc) sInc.value = incorrectColor;
                    const sAcc = document.getElementById("accentColorPicker");
                    if (sAcc) sAcc.value = accentColor;
                    const sBg = document.getElementById("colorPicker");
                    if (sBg) sBg.value = currentBackgroundColor;
                    const sDark = document.getElementById("darkModeToggle");
                    if (sDark) sDark.checked = darkMode;
                    saveSettings();
                }

                // Step 2: PAO source — mirrors Settings → PAO Source.
                // Radio cards; selecting Textarea hides the Excel uploader
                // and shows the three textareas (with live updates).
                function renderInstallerPaoSource(body) {
                    body.appendChild(
                        _installerPHtml(
                            'Enter one entry per line as <code style="background:var(--modal-bg-subtle);padding:1px 4px;border-radius:3px;">Number - Term</code>, or import from a spreadsheet.',
                        ),
                    );

                    // ── Import from Excel (optional, populates the textareas) ──
                    const excelSection = document.createElement("details");
                    excelSection.id = "instExcelSection";
                    excelSection.style.cssText = "margin-bottom:10px;border:1px solid var(--modal-border);border-radius:6px;padding:8px 10px;";
                    if (instExcelLoaded) excelSection.open = true;
                    excelSection.innerHTML = `
                        <summary style="cursor:pointer;user-select:none;font-weight:bold;">Import from Excel</summary>
                        <div style="margin-top:8px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                            <label for="instExcelUpload" class="settings-btn" style="cursor:pointer">Choose file</label>
                            <input type="file" id="instExcelUpload" accept=".xlsx,.xls" style="display:none">
                            <span id="instExcelStatus" class="anki-status" style="text-align:left;">${instExcelLoaded ? "✓ Excel loaded — textareas populated" : "No file selected."}</span>
                        </div>
                        <details style="margin-top:8px;font-size:0.85rem;color:var(--modal-text-muted);">
                            <summary style="cursor:pointer;user-select:none;">Column assignment</summary>
                            <table style="margin-top:6px;border-collapse:collapse;font-size:0.82rem;">
                                <tr><td style="padding:3px 8px 3px 0">Row number</td>
                                    <td><input type="text" id="instExcelNumCol" class="short-input" style="width:44px" value="${excelColumnConfig.numCol}"></td>
                                    <td style="padding:3px 0 3px 8px;color:#aaa">both modes</td></tr>
                                <tr><td style="padding:3px 8px 3px 0">Person (3-digit)</td>
                                    <td><input type="text" id="instExcelPerson3Col" class="short-input" style="width:44px" value="${excelColumnConfig.person3Col}"></td>
                                    <td style="padding:3px 0 3px 8px;color:#aaa">3-2-3 mode</td></tr>
                                <tr><td style="padding:3px 8px 3px 0">Action (2-digit)</td>
                                    <td><input type="text" id="instExcelAction2Col" class="short-input" style="width:44px" value="${excelColumnConfig.action2Col}"></td>
                                    <td style="padding:3px 0 3px 8px;color:#aaa">both modes</td></tr>
                                <tr><td style="padding:3px 8px 3px 0">Object (3-digit)</td>
                                    <td><input type="text" id="instExcelObject3Col" class="short-input" style="width:44px" value="${excelColumnConfig.object3Col}"></td>
                                    <td style="padding:3px 0 3px 8px;color:#aaa">3-2-3 mode</td></tr>
                                <tr><td style="padding:3px 8px 3px 0">Person (2-digit)</td>
                                    <td><input type="text" id="instExcelPerson2Col" class="short-input" style="width:44px" value="${excelColumnConfig.person2Col}"></td>
                                    <td style="padding:3px 0 3px 8px;color:#aaa">2-2-2 mode</td></tr>
                                <tr><td style="padding:3px 8px 3px 0">Object (2-digit)</td>
                                    <td><input type="text" id="instExcelObject2Col" class="short-input" style="width:44px" value="${excelColumnConfig.object2Col}"></td>
                                    <td style="padding:3px 0 3px 8px;color:#aaa">2-2-2 mode</td></tr>
                            </table>
                        </details>`;
                    body.appendChild(excelSection);

                    // ── Textareas (always visible) ──
                    const tPerson = document.createElement("textarea");
                    tPerson.id = "instPersonList";
                    tPerson.placeholder = "Person (Num - Name)";
                    tPerson.style.cssText = "width:100%;min-height:60px;font-family:monospace;font-size:0.85rem;margin-bottom:4px;";
                    tPerson.value = formatPaoList(personList);
                    body.appendChild(tPerson);

                    const tAction = document.createElement("textarea");
                    tAction.id = "instActionList";
                    tAction.placeholder = "Action (Num - Action)";
                    tAction.style.cssText = "width:100%;min-height:60px;font-family:monospace;font-size:0.85rem;margin-bottom:4px;";
                    tAction.value = formatPaoList(actionList);
                    body.appendChild(tAction);

                    const tObject = document.createElement("textarea");
                    tObject.id = "instObjectList";
                    tObject.placeholder = "Object (Num - Object)";
                    tObject.style.cssText = "width:100%;min-height:60px;font-family:monospace;font-size:0.85rem;";
                    tObject.value = formatPaoList(objectList);
                    body.appendChild(tObject);

                    const instSummary = document.createElement("div");
                    instSummary.id = "instPaoTextareaValidationSummary";
                    instSummary.className = "inst-validation-summary";
                    body.appendChild(instSummary);

                    // Ensure paoDataSource is textarea — data always lives in textareas now.
                    paoDataSource = "textarea";

                    setTimeout(() => {
                        // Live validation on textarea input
                        const onTaInput = (id, setter) => {
                            const el = document.getElementById(id);
                            if (!el) return;
                            el.addEventListener("input", () => {
                                setter(parsePaoList(el.value));
                                _updateInstallerPaoValidation();
                                _installerUpdateNextButton();
                            });
                        };
                        onTaInput("instPersonList", (m) => (personList = m));
                        onTaInput("instActionList", (m) => (actionList = m));
                        onTaInput("instObjectList", (m) => (objectList = m));

                        // Excel upload → populate textareas
                        const ex = document.getElementById("instExcelUpload");
                        if (ex) {
                            ex.addEventListener("change", (e) => {
                                const real = document.getElementById("excelFileUpload");
                                if (real) {
                                    const dt = new DataTransfer();
                                    if (e.target.files[0]) dt.items.add(e.target.files[0]);
                                    real.files = dt.files;
                                    real.dispatchEvent(new Event("change"));
                                    // Give the real handler time to parse, then sync textareas
                                    setTimeout(() => {
                                        const tp = document.getElementById("instPersonList");
                                        const ta = document.getElementById("instActionList");
                                        const to = document.getElementById("instObjectList");
                                        if (tp) tp.value = formatPaoList(excelPersonList);
                                        if (ta) ta.value = formatPaoList(excelActionList);
                                        if (to) to.value = formatPaoList(excelObjectList);
                                        const st = document.getElementById("instExcelStatus");
                                        if (st) { st.textContent = "✓ Excel loaded — textareas populated"; st.className = "anki-status loaded"; }
                                        _updateInstallerPaoValidation();
                                        _installerUpdateNextButton();
                                    }, 300);
                                }
                            });
                        }

                        // Wire column inputs → excelColumnConfig
                        const colMap = {
                            instExcelNumCol: "numCol", instExcelPerson3Col: "person3Col",
                            instExcelAction2Col: "action2Col", instExcelObject3Col: "object3Col",
                            instExcelPerson2Col: "person2Col", instExcelObject2Col: "object2Col",
                        };
                        for (const [id, key] of Object.entries(colMap)) {
                            const el = document.getElementById(id);
                            if (el) {
                                el.addEventListener("input", () => {
                                    excelColumnConfig[key] = el.value.trim().toUpperCase() || excelColumnConfig[key];
                                    const real = document.getElementById(id.replace("instExcel", "excel"));
                                    if (real) real.value = el.value;
                                    saveSettings();
                                });
                            }
                        }

                        _updateInstallerPaoValidation();
                        _installerUpdateNextButton();
                    }, 0);
                }
                function _saveInstallerPaoSource() {
                    // paoDataSource is always "textarea" in the installer now.
                    paoDataSource = "textarea";
                    const radio = document.querySelector(
                        `input[name="paoDataSource"][value="textarea"]`,
                    );
                    if (radio) radio.checked = true;
                    // Mirror textareas into the settings textareas
                    const tPerson = document.getElementById("instPersonList");
                    const tAction = document.getElementById("instActionList");
                    const tObject = document.getElementById("instObjectList");
                    if (tPerson && personListTextarea)
                        personListTextarea.value = tPerson.value;
                    if (tAction && actionListTextarea)
                        actionListTextarea.value = tAction.value;
                    if (tObject && objectListTextarea)
                        objectListTextarea.value = tObject.value;
                    saveSettings();
                }

                // Step 3: PAO range — matches the Settings → PAO Ranges layout.
                function renderInstallerPaoRanges(body) {
                    body.appendChild(
                        _installerP(
                            "Pick which PAO mode(s) the app should use.",
                        ),
                    );
                    // 2-2-2 / 3-2-3 / Both radio
                    const radioRow = document.createElement("div");
                    radioRow.className = "setting-row";
                    radioRow.style.cssText =
                        "justify-content: space-around; margin-bottom: 10px;";
                    radioRow.innerHTML = `
                        <label><input type="radio" name="instPaoRangeMode" value="222" ${
                            paoRangeMode === "222" ? "checked" : ""
                        }> 2-2-2</label>
                        <label><input type="radio" name="instPaoRangeMode" value="323" ${
                            paoRangeMode === "323" ? "checked" : ""
                        }> 3-2-3</label>
                        <label><input type="radio" name="instPaoRangeMode" value="both" ${
                            paoRangeMode === "both" ? "checked" : ""
                        }> Both</label>`;
                    body.appendChild(radioRow);

                    // Locked-mode status line (shown when single-mode)
                    const lockedMsg = document.createElement("div");
                    lockedMsg.id = "instPaoRangeLockedMsg";
                    lockedMsg.style.cssText =
                        "display:none;font-size:0.8rem;color:var(--modal-text-muted);margin:4px 0 8px 0;";
                    body.appendChild(lockedMsg);

                    // Crossover input (only shown in "Both" mode)
                    const crossRow = document.createElement("div");
                    crossRow.id = "instPaoRangeBothRow";
                    crossRow.className = "setting-row";
                    crossRow.innerHTML = `<label style="min-width:140px">2-2-2 / 3-2-3 crossover at:</label>
                        <input type="number" id="instRangeCrossover" min="1" max="${
                            PI_DIGITS.length - 1
                        }" value="${rangeCrossover}" inputmode="numeric" class="short-input">
                        <span style="color:var(--modal-text-muted);font-size:0.8rem">(2-2-2 ends at position ${rangeCrossover}, 3-2-3 starts at ${rangeCrossover + 1})</span>`;
                    body.appendChild(crossRow);

                    // Wire radio changes + show/hide crossover input
                    setTimeout(() => {
                        const update = () => {
                            const sel = document.querySelector(
                                'input[name="instPaoRangeMode"]:checked',
                            );
                            const v = sel ? sel.value : paoRangeMode;
                            const crossEl = document.getElementById(
                                "instPaoRangeBothRow",
                            );
                            const msg = document.getElementById(
                                "instPaoRangeLockedMsg",
                            );
                            if (crossEl) crossEl.style.display = "";
                            if (msg) {
                                msg.style.display = "none";
                                msg.textContent = "";
                            }
                            if (v === "222") {
                                if (crossEl) crossEl.style.display = "none";
                                if (msg) {
                                    msg.textContent = `2-2-2 mode active. Covers all pi digits in this app.`;
                                    msg.style.display = "";
                                }
                            } else if (v === "323") {
                                if (crossEl) crossEl.style.display = "none";
                                if (msg) {
                                    msg.textContent = `3-2-3 mode active. Covers all pi digits in this app.`;
                                    msg.style.display = "";
                                }
                            }
                        };
                        document
                            .querySelectorAll(
                                'input[name="instPaoRangeMode"]',
                            )
                            .forEach((r) =>
                                r.addEventListener("change", update),
                            );
                        // Live update the helper text when the user edits
                        // the crossover input.
                        const crossEl =
                            document.getElementById("instRangeCrossover");
                        if (crossEl) {
                            crossEl.addEventListener("input", () => {
                                const v = parseInt(crossEl.value);
                                if (isNaN(v)) return;
                                rangeCrossover = v;
                                _applyPaoRangeMode();
                            });
                        }
                        update();
                    }, 0);
                }
                function _saveInstallerPaoRanges() {
                    // Read the mode radio
                    const sel = document.querySelector(
                        'input[name="instPaoRangeMode"]:checked',
                    );
                    if (sel) paoRangeMode = sel.value;
                    if (paoRangeMode === "both") {
                        const crossEl =
                            document.getElementById("instRangeCrossover");
                        if (crossEl)
                            rangeCrossover =
                                parseInt(crossEl.value) || rangeCrossover;
                    }
                    _applyPaoRangeMode();
                    // Mirror the crossover into the settings input
                    const sCross = document.getElementById("rangeCrossover");
                    if (sCross) sCross.value = rangeCrossover;
                    saveSettings();
                }

                // Step 4: Anki images (skippable) — mirrors Settings → Anki Images.
                function renderInstallerAnkiImages(body) {
                    body.appendChild(
                        _installerPHtml(
                            'The .txt exports below link your PAO terms to image filenames. To get the files, <a href="https://github.com/xiorter/pi-pao-practice/blob/main/docs/SETTING_UP_ANKI.md" target="_blank" rel="noopener" style="color:var(--accent)">read the Anki setup guide</a>.',
                        ),
                    );

                    // .txt uploads — proxy through the real hidden inputs so all
                    // shared state (ankiImages, ankiImages2) is updated in one place.
                    const upWrap = document.createElement("div");
                    upWrap.className = "setting-row";
                    upWrap.style.cssText = "flex-direction:column;align-items:flex-start;gap:6px;";
                    upWrap.innerHTML = `
                        <label style="font-weight:bold">Millennium PAO — 3-digit images (.txt):</label>
                        <input type="file" id="instAnkiTxt1" accept=".txt">
                        <div id="instAnkiStatus1" class="anki-status${Object.keys(ankiImages).length > 0 ? ' loaded' : ''}">${Object.keys(ankiImages).length > 0 ? `✓ ${Math.round(Object.keys(ankiImages).length/3)} entries loaded` : "No file loaded."}</div>
                        <label style="font-weight:bold">Century PAO — 2-digit images (.txt):</label>
                        <input type="file" id="instAnkiTxt2" accept=".txt">
                        <div id="instAnkiStatus2" class="anki-status${Object.keys(ankiImages2).length > 0 ? ' loaded' : ''}">${Object.keys(ankiImages2).length > 0 ? `✓ ${Math.round(Object.keys(ankiImages2).length/3)} entries loaded` : "No file loaded."}</div>`;
                    body.appendChild(upWrap);

                    // Media loaders — same set of buttons as Settings → Anki Images.
                    const media = document.createElement("div");
                    media.className = "setting-row";
                    media.style.cssText = "flex-direction:column;align-items:flex-start;gap:8px;";
                    const folderSupported = "showDirectoryPicker" in window;
                    const folderBtnHtml = folderSupported
                        ? `<button type="button" id="instMediaFolderBtn" class="settings-btn">Choose media folder</button>`
                        : "";
                    media.innerHTML = `
                        <label style="font-weight:bold">Load media:</label>
                        <div style="display:flex;gap:8px;flex-wrap:wrap">
                            ${folderBtnHtml}
                            <label for="instMediaZip" class="settings-btn" style="cursor:pointer;display:inline-block;">Upload media .zip</label>
                            <input type="file" id="instMediaZip" accept=".zip" style="display:none">
                            <button type="button" id="instMediaFilesBtn" class="settings-btn">Select image files…</button>
                            <input type="file" id="instMediaFiles" multiple accept="image/*" style="display:none">
                        </div>
                        <div id="instMediaStatus" class="anki-status js-media-status${Object.keys(mediaFileMap).length > 0 ? ' loaded' : ''}" style="text-align:left;">${Object.keys(mediaFileMap).length > 0 ? '✓ Media loaded.' : 'No media selected.'}</div>`;
                    body.appendChild(media);

                    setTimeout(() => {
                        // ── Txt proxies ──
                        const proxyTxt = (instId, realId) => {
                            const inst = document.getElementById(instId);
                            if (!inst) return;
                            inst.addEventListener("change", (e) => {
                                const real = document.getElementById(realId);
                                if (real) {
                                    const dt = new DataTransfer();
                                    if (e.target.files[0]) dt.items.add(e.target.files[0]);
                                    real.files = dt.files;
                                    real.dispatchEvent(new Event("change"));
                                }
                                // Status update happens inside reader.onload (async),
                                // so we don't mirror here — the txt handlers do it.
                                _installerUpdateNextButton();
                            });
                        };
                        proxyTxt("instAnkiTxt1", "ankiTxtUpload");
                        proxyTxt("instAnkiTxt2", "ankiTxtUpload2");

                        // ── Folder picker ──
                        const fb = document.getElementById("instMediaFolderBtn");
                        if (fb) {
                            fb.addEventListener("click", async () => {
                                try {
                                    const handle = await window.showDirectoryPicker();
                                    await loadMediaFromHandle(handle);
                                    await clearExtractedBlobs();
                                    _installerUpdateNextButton();
                                } catch (e) {
                                    if (e.name !== "AbortError")
                                        _setMediaStatus("Folder pick failed: " + e.message);
                                }
                            });
                        }

                        // ── Zip upload ──
                        const zi = document.getElementById("instMediaZip");
                        if (zi) {
                            zi.addEventListener("change", async (e) => {
                                const f = e.target.files[0];
                                if (!f) return;
                                zi.disabled = true;
                                _setMediaStatus(`Reading ${f.name} (${Math.round(f.size/1024/1024)} MB)…`);
                                const buf = await f.arrayBuffer();
                                await loadMediaFromZip(buf, f.name);
                                zi.disabled = false;
                                e.target.value = "";
                                _installerUpdateNextButton();
                            });
                        }

                        // ── Direct file picker ──
                        const instFilesBtn = document.getElementById("instMediaFilesBtn");
                        const instFilesInput = document.getElementById("instMediaFiles");
                        if (instFilesBtn && instFilesInput) {
                            instFilesBtn.onclick = () => instFilesInput.click();
                            instFilesInput.onchange = (ev) => {
                                // Proxy through the settings-panel file picker handler
                                // by dispatching the same event to the shared input.
                                // Since there's no shared hidden input here, we reuse
                                // the same logic directly.
                                const settingsInput = document.getElementById("mediaFilesUpload");
                                if (settingsInput) {
                                    // Build a synthetic FileList and dispatch
                                    const dt = new DataTransfer();
                                    for (const f of ev.target.files) dt.items.add(f);
                                    settingsInput.files = dt.files;
                                    settingsInput.dispatchEvent(new Event("change"));
                                } else {
                                    // Fallback: run the same logic inline
                                    const files = Array.from(ev.target.files);
                                    const neededFiles = new Set();
                                    for (const map of [ankiImages, ankiImages2]) {
                                        for (const entry of Object.values(map)) {
                                            if (entry.personSrc) neededFiles.add(entry.personSrc);
                                            if (entry.objectSrc) neededFiles.add(entry.objectSrc);
                                        }
                                    }
                                    Object.values(mediaFileMap).forEach(u => { try { URL.revokeObjectURL(u); } catch(e) {} });
                                    mediaFileMap = {};
                                    const accepted = [];
                                    for (const file of files) {
                                        const lower = file.name.toLowerCase();
                                        if (!lower.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) continue;
                                        if (neededFiles.size > 0 && !neededFiles.has(file.name)) continue;
                                        mediaFileMap[file.name] = URL.createObjectURL(file);
                                        accepted.push(file);
                                    }
                                    const count = accepted.length;
                                    const neededTotal = neededFiles.size;
                                    const countStr = neededTotal > 0 ? `${count} / ${neededTotal}` : `${count}`;
                                    mediaFolderName = countStr + " images";
                                    saveSettings();
                                    _setMediaStatus(`✓ ${countStr} image${count === 1 ? "" : "s"} loaded`, true);
                                    if (accepted.length > 0) {
                                        Promise.all(accepted.map(f => f.arrayBuffer().then(b => [f.name, new Uint8Array(b)])))
                                            .then(pairs => saveExtractedBlobs(Object.fromEntries(pairs), mediaFolderName))
                                            .catch(e => console.warn("Could not persist blobs:", e));
                                    }
                                }
                                ev.target.value = "";
                                _installerUpdateNextButton();
                            };
                        }
                    }, 0);
                }

                // Step 5: Cloud sync (optional) — mirrors Settings → Cloud Sync.
                function renderInstallerCloudSync(body) {
                    body.appendChild(
                        _installerP(
                            "Sync your review progress and position across devices.",
                        ),
                    );
                    const link = document.createElement("p");
                    link.style.cssText =
                        "font-size:0.85rem;color:var(--modal-text-muted);margin:4px 0 8px;";
                    link.innerHTML = `Requires a free <a href="https://console.firebase.google.com" target="_blank" rel="noopener" style="color:var(--accent)">Firebase project</a>. Paste your config object below, then click Connect.`;
                    body.appendChild(link);

                    const ta = document.createElement("textarea");
                    ta.id = "instFirebaseConfig";
                    ta.placeholder =
                        '{"apiKey":"...","authDomain":"...","projectId":"...",...}';
                    ta.style.cssText =
                        "width:100%;min-height:90px;font-family:monospace;font-size:0.8rem;padding:6px;background:var(--modal-input-bg);color:var(--modal-text-color);border:1px solid var(--modal-border);border-radius:4px;box-sizing:border-box;resize:vertical;";
                    const existing = document.getElementById("firebaseConfigInput");
                    if (existing && existing.value) {
                        ta.value = existing.value;
                        _fbValidateBorder(ta);
                    }
                    body.appendChild(ta);

                    // Connect button + status (status shares .js-firebase-status so
                    // _fbStatus() in the shared code updates it automatically).
                    const row = document.createElement("div");
                    row.style.cssText = "display:flex;align-items:center;gap:10px;margin-top:8px;flex-wrap:wrap;";
                    const connectBtn = document.createElement("button");
                    connectBtn.type = "button";
                    connectBtn.className = "settings-btn";
                    connectBtn.textContent = "Connect";
                    const statusSpan = document.createElement("span");
                    statusSpan.className = "js-firebase-status";
                    statusSpan.style.cssText = "font-size:0.82rem;color:#888;";
                    // Show current connection state
                    const realStatus = document.getElementById("firebaseStatus");
                    if (realStatus) {
                        statusSpan.textContent = realStatus.textContent;
                        statusSpan.style.color = realStatus.style.color || "#888";
                    }
                    row.appendChild(connectBtn);
                    row.appendChild(statusSpan);
                    body.appendChild(row);

                    setTimeout(() => {
                        const instTa = document.getElementById("instFirebaseConfig");
                        if (instTa) {
                            instTa.addEventListener("input", () => _fbValidateBorder(instTa));
                        }
                        connectBtn.addEventListener("click", () => {
                            if (!instTa) return;
                            const cfg = instTa.value.trim();
                            if (!cfg) { _fbStatus("Paste your Firebase config first", "#e05252"); return; }
                            // Mirror to the real settings input first
                            const real = document.getElementById("firebaseConfigInput");
                            if (real) { real.value = cfg; real.dispatchEvent(new Event("input")); }
                            _fbConnect(cfg);
                        });
                    }, 0);
                }
                function _saveInstallerCloudSync() {
                    const ta = document.getElementById("instFirebaseConfig");
                    const real = document.getElementById("firebaseConfigInput");
                    if (ta && real) {
                        real.value = ta.value;
                        real.dispatchEvent(new Event("input"));
                    }
                }

                // Installer nav wiring — one-time bind after the modal exists in the DOM
                (function wireInstallerNav() {
                    const back = () => {
                        if (_installerStep > 0) {
                            openInstaller(_installerStep - 1);
                        }
                    };
                    const next = () => {
                        // Save current step's inputs before advancing
                        const step = _INSTALLER_STEPS[_installerStep];
                        if (step === "appearance")
                            _saveInstallerAppearance();
                        else if (step === "paoSource")
                            _saveInstallerPaoSource();
                        else if (step === "paoRanges")
                            _saveInstallerPaoRanges();
                        else if (step === "cloudSync")
                            _saveInstallerCloudSync();
                        // paoRanges/ankiImages save nothing extra here

                        if (_installerStep === _INSTALLER_STEPS.length - 1) {
                            closeInstaller();
                            return;
                        }
                        openInstaller(_installerStep + 1);
                    };
                    const skip = () => {
                        if (_installerStep === _INSTALLER_STEPS.length - 1) {
                            closeInstaller();
                        } else {
                            openInstaller(_installerStep + 1);
                        }
                    };
                    const close = () => closeInstaller();

                    const bind = () => {
                        const $ = (id) => document.getElementById(id);
                        const backBtn = $("installerBackBtn");
                        const nextBtn = $("installerNextBtn");
                        const skipBtn = $("installerSkipBtn");
                        const closeBtn = $("installerCloseBtn");
                        if (backBtn) backBtn.onclick = back;
                        if (nextBtn) nextBtn.onclick = next;
                        if (skipBtn) skipBtn.onclick = skip;
                        if (closeBtn) closeBtn.onclick = close;
                    };
                    // Try binding now, and again once DOM is ready.
                    bind();
                    document.addEventListener("DOMContentLoaded", bind);
                    // Also rebind after a tick in case the modal is created late.
                    setTimeout(bind, 0);
                })();

                document.addEventListener("DOMContentLoaded", init);
            })();
