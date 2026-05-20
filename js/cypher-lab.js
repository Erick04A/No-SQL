document.addEventListener('DOMContentLoaded', () => {
    const btnSql = document.getElementById('btn-sql');
    const btnNodos = document.getElementById('btn-nodos');
    const labNodosContainer = document.getElementById('lab-nodos-container');
    const labSqlContainer = document.getElementById('lab-sql-container');

    const sqlPills = document.querySelectorAll('.sql-pill');
    const sqlQueryView = document.getElementById('sql-query-view');
    const sqlLineNums = document.getElementById('sql-line-nums');
    const sqlTableHead = document.getElementById('sql-table-head');
    const sqlTableBody = document.getElementById('sql-table-body');
    const sqlStatusBar = document.getElementById('sql-status-bar');
    const sqlRunBtn = document.getElementById('sql-run-btn');

    const cypherPills = document.querySelectorAll('.cypher-pill');
    const cypherQueryView = document.getElementById('cypher-query-view');
    const cypherLineNums = document.getElementById('cypher-line-nums');
    const cypherInfoBox = document.getElementById('cypher-info-box');
    const cypherStatusBar = document.getElementById('cypher-status-bar');
    const cypherRunBtn = document.getElementById('cypher-run-btn');
    const visContainer = document.getElementById('vis-lab-new');
    const cypherBtnFit = document.getElementById('cypher-btn-fit');
    const cypherBtnZoomin = document.getElementById('cypher-btn-zoomin');
    const cypherBtnZoomout = document.getElementById('cypher-btn-zoomout');
    const cypherStatusLeft = document.getElementById('cypher-status-left');

    const btnComparar = document.getElementById('btn-comparar');
    const labCompararContainer = document.getElementById('lab-comparar-container');
    const compVisContainer = document.getElementById('comp-vis-lab-new');

    const datasets = {
        personas: {
            name: "Personas",
            query: "MATCH (p:Person)-[:CONOCE]->(q:Person) RETURN p, q",
            text: "Encuentra todas las personas conectadas por una relación CONOCE. El grafo revela círculos sociales y conexiones directas.",
            nodes: [
                { id: 1, label: 'Ana', group: 'person', font: { color: '#18181B' } },
                { id: 2, label: 'Carlos', group: 'person', font: { color: '#18181B' } },
                { id: 3, label: 'Denisse', group: 'person', font: { color: '#18181B' } },
                { id: 4, label: 'María', group: 'person', font: { color: '#18181B' } },
                { id: 5, label: 'Luis', group: 'person', font: { color: '#18181B' } }
            ],
            edges: [
                { from: 1, to: 2, label: 'CONOCE' }, { from: 1, to: 3, label: 'CONOCE' },
                { from: 3, to: 4, label: 'CONOCE' }, { from: 2, to: 5, label: 'CONOCE' },
                { from: 4, to: 1, label: 'CONOCE' }
            ],
            sqlLines: 7,
            sqlHtml: `<span class="sq-kw">SELECT</span>   <span class="sq-col">p.nombre</span><span class="sq-punc">,</span>\n         <span class="sq-col">q.nombre</span> <span class="sq-kw">AS</span> <span class="sq-col">conocido</span>\n<span class="sq-kw">FROM</span>     <span class="sq-tbl">personas</span> p\n<span class="sq-kw">JOIN</span>     <span class="sq-tbl">conoce</span> c\n  <span class="sq-kw">ON</span>     <span class="sq-col">p.id</span> <span class="sq-punc">=</span> <span class="sq-col">c.persona_id</span>\n<span class="sq-kw">JOIN</span>     <span class="sq-tbl">personas</span> q\n  <span class="sq-kw">ON</span>     <span class="sq-col">c.conocido_id</span> <span class="sq-punc">=</span> <span class="sq-col">q.id</span>`,
            sqlCols: ["Persona", "Conoce"],
            sqlData: [
                ["Ana", "Carlos"], ["Ana", "Denisse"], ["Denisse", "María"], ["Carlos", "Luis"], ["María", "Ana"]
            ],
            sqlStatus: "5 filas · 0.002s",
            cyLines: 4,
            cyHtml: `<span class="cy-kw">MATCH</span>  <span class="cy-punc">(</span><span class="cy-var">p</span><span class="cy-lbl">:Person</span><span class="cy-punc">)</span>\n         <span class="cy-punc">-</span><span class="cy-punc">[</span><span class="cy-rel">:CONOCE</span><span class="cy-punc">]</span><span class="cy-punc">-&gt;</span>\n       <span class="cy-punc">(</span><span class="cy-var">q</span><span class="cy-lbl">:Person</span><span class="cy-punc">)</span>\n<span class="cy-kw">RETURN</span> <span class="cy-var">p</span><span class="cy-punc">,</span> <span class="cy-var">q</span>`,
            cyInfo: `// Traversal directo — sin JOINs`,
            nodeCount: 5,
            edgeCount: 5
        },
        peliculas: {
            name: "Películas",
            query: "MATCH (m:Movie)<-[:ACTUO_EN]-(a:Actor) RETURN m, a",
            text: "Devuelve películas y los actores que participaron en ellas. También muestra directores y sus obras.",
            nodes: [
                { id: 1, label: 'The Matrix', group: 'movie', font: { color: '#18181B' } },
                { id: 2, label: 'Keanu Reeves', group: 'person', font: { color: '#18181B' } },
                { id: 3, label: 'Carrie-Anne Moss', group: 'person', font: { color: '#18181B' } },
                { id: 4, label: 'Interstellar', group: 'movie', font: { color: '#18181B' } },
                { id: 5, label: 'McConaughey', group: 'person', font: { color: '#18181B' } },
                { id: 6, label: 'Nolan', group: 'person', font: { color: '#18181B' } },
                { id: 7, label: 'Wachowski', group: 'person', font: { color: '#18181B' } }
            ],
            edges: [
                { from: 2, to: 1, label: 'ACTUO_EN' }, { from: 3, to: 1, label: 'ACTUO_EN' },
                { from: 7, to: 1, label: 'DIRIGIO' }, { from: 5, to: 4, label: 'ACTUO_EN' },
                { from: 6, to: 4, label: 'DIRIGIO' }
            ],
            sqlLines: 7,
            sqlHtml: `<span class="sq-kw">SELECT</span>   <span class="sq-col">a.nombre</span> <span class="sq-kw">AS</span> <span class="sq-col">actor</span><span class="sq-punc">,</span>\n         <span class="sq-col">m.titulo</span> <span class="sq-kw">AS</span> <span class="sq-col">pelicula</span>\n<span class="sq-kw">FROM</span>     <span class="sq-tbl">actores</span> a\n<span class="sq-kw">JOIN</span>     <span class="sq-tbl">actuo_en</span> r\n  <span class="sq-kw">ON</span>     <span class="sq-col">a.id</span> <span class="sq-punc">=</span> <span class="sq-col">r.actor_id</span>\n<span class="sq-kw">JOIN</span>     <span class="sq-tbl">peliculas</span> m\n  <span class="sq-kw">ON</span>     <span class="sq-col">r.pelicula_id</span> <span class="sq-punc">=</span> <span class="sq-col">m.id</span>`,
            sqlCols: ["Actor", "Película"],
            sqlData: [
                ["Keanu Reeves", "The Matrix"], ["Carrie-Anne Moss", "The Matrix"], ["McConaughey", "Interstellar"], ["Wachowski", "The Matrix (Staff)"], ["Nolan", "Interstellar (Staff)"]
            ],
            sqlStatus: "5 filas · 0.003s",
            cyLines: 4,
            cyHtml: `<span class="cy-kw">MATCH</span>  <span class="cy-punc">(</span><span class="cy-var">a</span><span class="cy-lbl">:Actor</span><span class="cy-punc">)</span>\n         <span class="cy-punc">-</span><span class="cy-punc">[</span><span class="cy-rel">:ACTUO_EN</span><span class="cy-punc">]</span><span class="cy-punc">-&gt;</span>\n       <span class="cy-punc">(</span><span class="cy-var">m</span><span class="cy-lbl">:Movie</span><span class="cy-punc">)</span>\n<span class="cy-kw">RETURN</span> <span class="cy-var">a</span><span class="cy-punc">,</span> <span class="cy-var">m</span>`,
            cyInfo: `// 2 entidades, 1 relación — legible como oración`,
            nodeCount: 7,
            edgeCount: 5
        },
        fraude: {
            name: "Fraude",
            query: "MATCH (c:Client)-[:HIZO]->(t:Transaction)-[:A]->(c2:Client) RETURN c, t, c2",
            text: "Detecta transacciones entre clientes que podrían indicar fraude. Busca patrones circulares o intermediosos sospechosos.",
            nodes: [
                { id: 1, label: 'Cliente A', group: 'person', font: { color: '#18181B' } },
                { id: 2, label: 'TX-001', group: 'transaction', font: { color: '#18181B' } },
                { id: 3, label: 'Cliente B', group: 'person', font: { color: '#18181B' } },
                { id: 4, label: 'TX-002', group: 'transaction', font: { color: '#18181B' } },
                { id: 5, label: 'Cliente C', group: 'person', font: { color: '#18181B' } }
            ],
            edges: [
                { from: 1, to: 2, label: 'HIZO' }, { from: 2, to: 3, label: 'A' },
                { from: 3, to: 4, label: 'HIZO' }, { from: 4, to: 5, label: 'A' },
                { from: 5, to: 2, label: 'HIZO' }
            ],
            sqlLines: 8,
            sqlHtml: `<span class="sq-kw">SELECT</span>   <span class="sq-col">c.nombre</span> <span class="sq-kw">AS</span> <span class="sq-col">origen</span><span class="sq-punc">,</span>\n         <span class="sq-col">t.monto</span><span class="sq-punc">,</span>\n         <span class="sq-col">c2.nombre</span> <span class="sq-kw">AS</span> <span class="sq-col">destino</span>\n<span class="sq-kw">FROM</span>     <span class="sq-tbl">clientes</span> c\n<span class="sq-kw">JOIN</span>     <span class="sq-tbl">transacciones</span> t\n  <span class="sq-kw">ON</span>     <span class="sq-col">c.id</span> <span class="sq-punc">=</span> <span class="sq-col">t.cliente_id</span>\n<span class="sq-kw">JOIN</span>     <span class="sq-tbl">clientes</span> c2\n  <span class="sq-kw">ON</span>     <span class="sq-col">t.destino_id</span> <span class="sq-punc">=</span> <span class="sq-col">c2.id</span>`,
            sqlCols: ["Origen", "Monto", "Destino"],
            sqlData: [
                ["Cliente A", "$5000", "Cliente B"], ["Cliente B", "$3200", "Cliente C"], ["Cliente C", "$4800", "Cliente A"]
            ],
            sqlStatus: "3 filas · 0.001s",
            cyLines: 6,
            cyHtml: `<span class="cy-kw">MATCH</span>  <span class="cy-punc">(</span><span class="cy-var">c</span><span class="cy-lbl">:Client</span><span class="cy-punc">)</span>\n         <span class="cy-punc">-</span><span class="cy-punc">[</span><span class="cy-rel">:HIZO</span><span class="cy-punc">]</span><span class="cy-punc">-&gt;</span>\n       <span class="cy-punc">(</span><span class="cy-var">t</span><span class="cy-lbl">:Transaction</span><span class="cy-punc">)</span>\n         <span class="cy-punc">-</span><span class="cy-punc">[</span><span class="cy-rel">:A</span><span class="cy-punc">]</span><span class="cy-punc">-&gt;</span>\n       <span class="cy-punc">(</span><span class="cy-var">c2</span><span class="cy-lbl">:Client</span><span class="cy-punc">)</span>\n<span class="cy-kw">RETURN</span> <span class="cy-var">c</span><span class="cy-punc">,</span> <span class="cy-var">t</span><span class="cy-punc">,</span> <span class="cy-var">c2</span>`,
            cyInfo: `// Patrón circular detectado en 1 query`,
            nodeCount: 5,
            edgeCount: 5
        }
    };

    let network = null;
    let currentDatasetKey = 'personas';

    const visOptions = {
        height: '100%', width: '100%',
        groups: {
            person: {
                shape: 'circle',
                color: {
                    background: '#6366F1',
                    border: 'rgba(255, 255, 255, 0.2)',
                    highlight: { background: '#6366F1', border: 'rgba(255, 255, 255, 0.4)' },
                    hover: { background: '#6366F1', border: 'rgba(255, 255, 255, 0.4)' }
                },
                size: 32, borderWidth: 2
            },
            movie: {
                shape: 'circle',
                color: {
                    background: '#06B6D4',
                    border: 'rgba(255, 255, 255, 0.2)',
                    highlight: { background: '#06B6D4', border: 'rgba(255, 255, 255, 0.4)' },
                    hover: { background: '#06B6D4', border: 'rgba(255, 255, 255, 0.4)' }
                },
                size: 32, borderWidth: 2
            },
            transaction: {
                shape: 'circle',
                color: {
                    background: '#06B6D4',
                    border: 'rgba(255, 255, 255, 0.2)',
                    highlight: { background: '#06B6D4', border: 'rgba(255, 255, 255, 0.4)' },
                    hover: { background: '#06B6D4', border: 'rgba(255, 255, 255, 0.4)' }
                },
                size: 32, borderWidth: 2
            }
        },
        nodes: {
            font: { color: '#ffffff', size: 13, face: 'Inter' }
        },
        edges: {
            color: { color: '#F59E0B', highlight: '#F59E0B' }, width: 2,
            font: { size: 11, color: '#F59E0B', strokeWidth: 0, align: 'top', face: 'monospace' },
            smooth: { type: 'curvedCW', roundness: 0.2 },
            arrows: { to: { enabled: true, scaleFactor: 0.6 } }
        },
        physics: {
            enabled: true, solver: 'forceAtlas2Based',
            forceAtlas2Based: { springLength: 140, gravitationalConstant: -800, springConstant: 0.05, avoidOverlap: 1 },
            stabilization: { enabled: true, iterations: 200, updateInterval: 10 }
        },
        interaction: {
            dragNodes: true, zoomView: true, hover: true
        }
    };

    function renderGraph(datasetKey) {
        if (network) { network.destroy(); network = null; }
        visContainer.innerHTML = '';
        requestAnimationFrame(() => {
            initNetwork(datasetKey);
        });
    }

    function initNetwork(datasetKey) {
        const data = datasets[datasetKey];
        const visNodes = new vis.DataSet([]);
        const visEdges = new vis.DataSet(data.edges);
        network = new vis.Network(visContainer, { nodes: visNodes, edges: visEdges }, visOptions);
        
        data.nodes.forEach((node, index) => {
            const cleanNode = {...node, font: { color: '#ffffff', face: 'Inter' }};
            setTimeout(() => { visNodes.add(cleanNode); }, index * 80);
        });

        network.on('hoverNode', (params) => {
            const nodeId = params.node;
            const nodeData = visNodes.get(nodeId);
            const domPos = network.canvasToDOM(network.getPositions([nodeId])[nodeId]);
            const tooltip = document.getElementById('neo-tooltip');
            if (tooltip && nodeData) {
                tooltip.innerText = nodeData.label;
                tooltip.style.left = (domPos.x + 15) + 'px';
                tooltip.style.top = (domPos.y - 40) + 'px';
                tooltip.style.opacity = '1';
            }
        });

        network.on('blurNode', () => {
            const tooltip = document.getElementById('neo-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
            }
        });

        network.on('drag', () => {
            const tooltip = document.getElementById('neo-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
            }
        });

        network.on('click', function(params) {
            if (params.nodes.length > 0) {
                network.setOptions({ physics: { enabled: false } });
            }
        });

        network.on('dragStart', function(params) {
            if (params.nodes.length > 0) {
                network.setOptions({ physics: { enabled: false } });
            }
        });

        network.setOptions({ 
            physics: { 
                enabled: true,
                solver: 'forceAtlas2Based',
                forceAtlas2Based: {
                    gravitationalConstant: -800,
                    springLength: 140,
                    springConstant: 0.05
                },
                stabilization: {
                    enabled: true,
                    iterations: 200,
                    updateInterval: 10
                }
            } 
        });

        network.once('stabilizationIterationsDone', function() {
            network.setOptions({ physics: { enabled: false } });
            network.fit({ animation: { duration: 500, easingFunction: 'easeInOutQuad' } });
        });
    }

    function updateSqlPanel(key) {
        const data = datasets[key];
        labSqlContainer.style.opacity = '0.4';
        
        const placeholder = document.getElementById('sql-placeholder');
        if (placeholder) {
            placeholder.style.display = 'flex';
        }
        
        setTimeout(() => {
            sqlQueryView.innerHTML = data.sqlHtml;
            
            let nums = "";
            for(let i=1; i<=data.sqlLines; i++) nums += i + "<br>";
            sqlLineNums.innerHTML = nums;

            sqlTableHead.innerHTML = '';
            sqlTableBody.innerHTML = '';
            
            sqlStatusBar.innerText = '';
            labSqlContainer.style.opacity = '1';
        }, 150);
    }

    function updateCypherPanel(key) {
        if (network) { network.destroy(); network = null; }
        const data = datasets[key];
        labNodosContainer.style.opacity = '0.4';

        const placeholder = document.getElementById('cypher-placeholder');
        if (placeholder) {
            placeholder.style.display = 'flex';
        }

        setTimeout(() => {
            cypherQueryView.innerHTML = data.cyHtml;

            let nums = "";
            for(let i=1; i<=data.cyLines; i++) nums += i + "<br>";
            cypherLineNums.innerHTML = nums;

            cypherInfoBox.innerText = data.cyInfo;

            cypherStatusLeft.innerText = '';
            labNodosContainer.style.opacity = '1';
        }, 150);
    }

    let compNetwork = null;
    function renderMiniGraph() {
        if (compNetwork) { compNetwork.destroy(); compNetwork = null; }
        compVisContainer.innerHTML = '';

        const visNodes = new vis.DataSet([]);
        const visEdges = new vis.DataSet([
            { from: 1, to: 4, label: 'INTERPRETA', color: '#F59E0B', width: 2 },
            { from: 2, to: 5, label: 'INTERPRETA', color: '#F59E0B', width: 2 },
            { from: 2, to: 6, label: 'INTERPRETA', color: '#F59E0B', width: 2 },
            { from: 3, to: 5, label: 'INTERPRETA', color: '#F59E0B', width: 2 },
            { from: 4, to: 7, label: 'ES_GENERO', color: '#F59E0B', width: 2 },
            { from: 5, to: 8, label: 'ES_GENERO', color: '#F59E0B', width: 2 },
            { from: 5, to: 9, label: 'ES_GENERO', color: '#F59E0B', width: 2 },
            { from: 6, to: 8, label: 'ES_GENERO', color: '#F59E0B', width: 2 },
            { from: 2, to: 3, label: 'COLABORA', color: '#F59E0B', width: 2, dashes: true, arrows: { to: { enabled: true }, from: { enabled: true } } }
        ]);

        const miniOptions = {
            ...visOptions,
            height: '100%',
            width: '100%',
            interaction: {
                dragNodes: true, zoomView: true, hover: true
            }
        };

        compNetwork = new vis.Network(compVisContainer, { nodes: visNodes, edges: visEdges }, miniOptions);
        
        const musicNodes = [
            { id: 1, label: 'Taylor Swift', color: '#6366F1', size: 30, font: { color: '#ffffff', face: 'Inter' } },
            { id: 2, label: 'Bad Bunny', color: '#6366F1', size: 30, font: { color: '#ffffff', face: 'Inter' } },
            { id: 3, label: 'The Weeknd', color: '#6366F1', size: 30, font: { color: '#ffffff', face: 'Inter' } },
            { id: 4, label: 'Anti-Hero', color: '#06B6D4', size: 24, font: { color: '#ffffff', face: 'Inter' } },
            { id: 5, label: 'Creepin', color: '#06B6D4', size: 24, font: { color: '#ffffff', face: 'Inter' } },
            { id: 6, label: 'Moscow Mule', color: '#06B6D4', size: 24, font: { color: '#ffffff', face: 'Inter' } },
            { id: 7, label: 'Pop', color: '#F59E0B', size: 20, font: { color: '#ffffff', face: 'Inter' } },
            { id: 8, label: 'Latin Trap', color: '#F59E0B', size: 20, font: { color: '#ffffff', face: 'Inter' } },
            { id: 9, label: 'R&B', color: '#F59E0B', size: 20, font: { color: '#ffffff', face: 'Inter' } }
        ];

        musicNodes.forEach((node, index) => {
            setTimeout(() => { visNodes.add(node); }, index * 80);
        });

        compNetwork.on('click', function(params) {
            if (params.nodes.length > 0) {
                compNetwork.setOptions({ physics: { enabled: false } });
            }
        });

        compNetwork.on('dragStart', function(params) {
            if (params.nodes.length > 0) {
                compNetwork.setOptions({ physics: { enabled: false } });
            }
        });

        compNetwork.setOptions({ 
            physics: { 
                enabled: true,
                solver: 'forceAtlas2Based',
                forceAtlas2Based: {
                    gravitationalConstant: -800,
                    springLength: 140,
                    springConstant: 0.05
                },
                stabilization: {
                    enabled: true,
                    iterations: 200,
                    updateInterval: 10
                }
            } 
        });

        compNetwork.once('stabilizationIterationsDone', function() {
            compNetwork.setOptions({ physics: { enabled: false } });
            compNetwork.fit({ animation: { duration: 500, easingFunction: 'easeInOutQuad' } });
        });
    }

    function updateCompararPanel() {
        const compLeftCol = document.getElementById('comp-left-col');
        const compRightCol = document.getElementById('comp-right-col');

        compLeftCol.style.opacity = '0.3';
        compRightCol.style.opacity = '0.3';

        setTimeout(() => {
            renderMiniGraph();
            compLeftCol.style.opacity = '1';
            compRightCol.style.opacity = '1';
            setTimeout(() => {
                if (compNetwork) {
                    compNetwork.fit();
                }
            }, 100);
        }, 150);
    }

    function syncPills(key) {
        sqlPills.forEach(p => {
            if (p.dataset.key === key) p.classList.add('active');
            else p.classList.remove('active');
        });
        cypherPills.forEach(p => {
            if (p.dataset.key === key) p.classList.add('active');
            else p.classList.remove('active');
        });
    }

    btnSql.addEventListener('click', () => {
        btnSql.classList.add('active-sql');
        btnNodos.classList.remove('active-nodes');
        btnComparar.classList.remove('active-comparar');
        labNodosContainer.style.display = 'none';
        labSqlContainer.style.display = 'flex';
        labCompararContainer.style.display = 'none';
        syncPills(currentDatasetKey);
        updateSqlPanel(currentDatasetKey);
    });

    btnNodos.addEventListener('click', () => {
        btnNodos.classList.add('active-nodes');
        btnSql.classList.remove('active-sql');
        btnComparar.classList.remove('active-comparar');
        labSqlContainer.style.display = 'none';
        labNodosContainer.style.display = 'flex';
        labCompararContainer.style.display = 'none';
        syncPills(currentDatasetKey);
        updateCypherPanel(currentDatasetKey);
    });

    btnComparar.addEventListener('click', () => {
        btnComparar.classList.add('active-comparar');
        btnSql.classList.remove('active-sql');
        btnNodos.classList.remove('active-nodes');
        labSqlContainer.style.display = 'none';
        labNodosContainer.style.display = 'none';
        labCompararContainer.style.display = 'flex';
        syncPills(currentDatasetKey);
        updateCompararPanel();
    });

    sqlPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const key = pill.dataset.key;
            currentDatasetKey = key;
            syncPills(key);
            updateSqlPanel(key);
        });
    });

    cypherPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const key = pill.dataset.key;
            currentDatasetKey = key;
            syncPills(key);
            updateCypherPanel(key);
        });
    });

    let sqlExecuting = false;
    function executeSqlQuery() {
        if (sqlExecuting) return;
        sqlExecuting = true;

        const overlay = document.getElementById('sql-overlay');
        const placeholder = document.getElementById('sql-placeholder');
        const tableWrap = document.querySelector('.res-table-wrap');
        const runIcon = document.querySelector('#sql-run-btn .run-icon');

        overlay.classList.add('active');

        setTimeout(() => {
            overlay.classList.remove('active');
            if (placeholder) {
                placeholder.style.display = 'none';
            }

            const data = datasets[currentDatasetKey];

            sqlTableHead.innerHTML = `<tr>${data.sqlCols.map(col => `<th>${col}</th>`).join('')}</tr>`;
            sqlTableBody.innerHTML = data.sqlData.map(row => 
                `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
            ).join('');

            tableWrap.classList.remove('sql-table-fade-in');
            void tableWrap.offsetWidth;
            tableWrap.classList.add('sql-table-fade-in');

            const randomTime = Math.floor(Math.random() * 9) + 1;
            sqlStatusBar.innerHTML = `<span style="color: #28C840; font-weight: bold; margin-right: 4px;">✓</span>${data.sqlData.length} filas devueltas · 0.00${randomTime}s`;

            runIcon.textContent = '✓';
            setTimeout(() => {
                runIcon.textContent = '▶';
            }, 800);

            sqlExecuting = false;
        }, 600);
    }

    sqlRunBtn.addEventListener('click', executeSqlQuery);

    let cypherExecuting = false;
    function executeCypherQuery() {
        if (cypherExecuting) return;
        cypherExecuting = true;

        const overlay = document.getElementById('cypher-overlay');
        const placeholder = document.getElementById('cypher-placeholder');
        const runIcon = document.querySelector('#cypher-run-btn .run-icon');

        overlay.classList.add('active');

        setTimeout(() => {
            overlay.classList.remove('active');
            if (placeholder) {
                placeholder.style.display = 'none';
            }

            renderGraph(currentDatasetKey);

            const data = datasets[currentDatasetKey];
            const randomTime = Math.floor(Math.random() * 9) + 1;
            cypherStatusLeft.innerHTML = `<span style="color: #28C840; font-weight: bold; margin-right: 4px;">✓</span>${data.nodeCount} nodos · ${data.edgeCount} relaciones · 0.00${randomTime}s`;

            runIcon.textContent = '✓';
            setTimeout(() => {
                runIcon.textContent = '▶';
            }, 800);

            cypherExecuting = false;
        }, 600);
    }

    cypherRunBtn.addEventListener('click', executeCypherQuery);

    cypherBtnFit.addEventListener('click', () => {
        if (network) network.fit();
    });

    cypherBtnZoomin.addEventListener('click', () => {
        if (network) {
            const currentScale = network.getScale();
            network.moveTo({ scale: currentScale * 1.2 });
        }
    });

    cypherBtnZoomout.addEventListener('click', () => {
        if (network) {
            const currentScale = network.getScale();
            network.moveTo({ scale: currentScale * 0.8 });
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'F5' || (e.ctrlKey && e.key === 'Enter')) {
            e.preventDefault();
            if (labSqlContainer.style.display === 'flex') {
                executeSqlQuery();
            } else if (labNodosContainer.style.display === 'flex') {
                executeCypherQuery();
            }
        }
    });

    updateCypherPanel('personas');
    updateSqlPanel('personas');
    updateCompararPanel();
});
