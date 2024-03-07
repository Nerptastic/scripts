// Define your table and field names directly
const tableName = 'MAIN: GradEng & Eng';
const fieldName = 'New URL/Node';

// Access the table
let table = base.getTable(tableName);
let field = table.getField(fieldName);

output.text(`Finding and replacing in the ${field.name} field of ${table.name}.`);

// Define your URL and node pairs
const urlNodePairs = [
  [
    'http://columbia-dev.barkleylabs.com/about/news/christine-hendon-appointed-new-strategic-diversity-role',
    'node/396'
  ],
  [
    'http://columbia-dev.barkleylabs.com/about/news/addressing-deluge-data-and-connectivity-bottlenecks',
    'node/398'
  ],
  [ 'http://columbia-dev.barkleylabs.com/peter-thoren', 'node/293' ],
  [
    'http://columbia-dev.barkleylabs.com/acceleration-fund-recipients-2018-2020',
    'node/246'
  ],
  [
    'http://columbia-dev.barkleylabs.com/academics/study-intern-abroad',
    'node/203'
  ],
  [
    'http://columbia-dev.barkleylabs.com/about/news/keeping-new-york-city-subway-track',
    'node/399'
  ],
  [
    'http://columbia-dev.barkleylabs.com/acceleration-funds-2020-2022',
    'node/247'
  ],
  [
    'http://columbia-dev.barkleylabs.com/about/news/inaugural-applications-open-integrated-musculoskeletal-training-program',
    'node/401'
  ],
  [ 'http://columbia-dev.barkleylabs.com/julia-di-18seas', 'node/256' ],
  [
    'http://columbia-dev.barkleylabs.com/about/news/new-outreach-director-looks-bridge-divides',
    'node/282'
  ],
  [ 'http://columbia-dev.barkleylabs.com/allan-m-cytryn', 'node/295' ],
  [
    'http://columbia-dev.barkleylabs.com/leaders-and-innovators-bob-bakish',
    'node/255'
  ],
  [ 'http://columbia-dev.barkleylabs.com/teri-sgammato', 'node/292' ],
  [
    'http://columbia-dev.barkleylabs.com/resources-telecommuting-and-remote-work',
    'node/257'
  ],
  [ 'http://columbia-dev.barkleylabs.com/jessica-tsoong', 'node/294' ],
  [
    'http://columbia-dev.barkleylabs.com/blavatnik-doctoral-fellows-2021-2022-cohort',
    'node/252'
  ],
  [ 'http://columbia-dev.barkleylabs.com/kelsey-nanan', 'node/362' ],
  [
    'http://columbia-dev.barkleylabs.com/raymond-p-daddazio',
    'node/296'
  ],
  [ 'http://columbia-dev.barkleylabs.com/deborah-owolabi', 'node/360' ],
  [ 'http://columbia-dev.barkleylabs.com/lance-murphy', 'node/361' ],
  [
    'http://columbia-dev.barkleylabs.com/blavatnik-doctoral-fellows-2018-2019-cohort',
    'node/249'
  ],
  [ 'http://columbia-dev.barkleylabs.com/kai-tinsley', 'node/363' ],
  [
    'http://columbia-dev.barkleylabs.com/yiannis-monovoukas',
    'node/291'
  ],
  [
    'http://columbia-dev.barkleylabs.com/jennifer-yu-cheng',
    'node/290'
  ],
  [
    'http://columbia-dev.barkleylabs.com/about/news/shining-light-hispanic-engineers',
    'node/284'
  ],
  [ 'http://columbia-dev.barkleylabs.com/wendy-pan', 'node/364' ],
  [
    'http://columbia-dev.barkleylabs.com/seas-research-equipment-assistance-program-reap',
    'node/260'
  ],
  [ 'http://columbia-dev.barkleylabs.com/jahran-dale', 'node/386' ],
  [ 'http://columbia-dev.barkleylabs.com/jay-mehta', 'node/289' ],
  [ 'http://columbia-dev.barkleylabs.com/amar-bhardwaj', 'node/388' ],
  [ 'http://columbia-dev.barkleylabs.com/guntaash-sahani', 'node/387' ],
  [ 'http://columbia-dev.barkleylabs.com/andrew-gaspar', 'node/297' ],
  [
    'http://columbia-dev.barkleylabs.com/dolores-zohrab-liebmann-fellowship',
    'node/367'
  ],
  [ 'http://columbia-dev.barkleylabs.com/chiara-vallini', 'node/389' ],
  [ 'http://columbia-dev.barkleylabs.com/athena-pagon', 'node/390' ],
  [
    'http://columbia-dev.barkleylabs.com/google-student-veterans-america-scholarship',
    'node/309'
  ],
  [
    'http://columbia-dev.barkleylabs.com/about/news/allie-obermeyer-named-2023-camille-dreyfus-teacher-scholar',
    'node/368'
  ],
  [
    'http://columbia-dev.barkleylabs.com/columbia-university-summer-undergraduate-research-experience-sure-program',
    'node/213'
  ],
  [
    'http://columbia-dev.barkleylabs.com/blavatnik-doctoral-fellows-2020-2021-cohort',
    'node/251'
  ],
  [
    'http://columbia-dev.barkleylabs.com/acceleration-funds-2019-2021',
    'node/248'
  ],
  [
    'http://columbia-dev.barkleylabs.com/about/news/celebrating-our-circle-connections',
    'node/373'
  ],
  [ 'http://columbia-dev.barkleylabs.com/ralph-izzo', 'node/288' ],
  [
    'http://columbia-dev.barkleylabs.com/columbia-space-initiative-selected-send-payload-space-station',
    'node/258'
  ],
  [
    'http://columbia-dev.barkleylabs.com/about/news/dr-sanja-vickovics-unique-journey-cancer-research',
    'node/372'
  ],
  [ 'http://columbia-dev.barkleylabs.com/reunion-2023', 'node/371' ],
  [ 'http://columbia-dev.barkleylabs.com/alex-battey', 'node/370' ],
  [
    'http://columbia-dev.barkleylabs.com/about/news/columbia-engineering-and-amazon-launch-undergraduate-program-increase-diversity-and',
    'node/283'
  ],
  [
    'http://columbia-dev.barkleylabs.com/about/news/memoriam-ck-chu',
    'node/369'
  ],
  [
    'http://columbia-dev.barkleylabs.com/blavatnik-doctoral-fellows-2019-2020-cohort',
    'node/250'
  ],
  [
    'http://columbia-dev.barkleylabs.com/kraft-global-fellows-program',
    'node/310'
  ],
  [
    'http://columbia-dev.barkleylabs.com/deans-leadership-society#accordion4',
    'node/262'
  ],
  [ 'http://columbia-dev.barkleylabs.com/intern-abroad', 'node/224' ],
  [
    'http://columbia-dev.barkleylabs.com/alumni/blavatnik-fund-engineering-innovations-health',
    'node/211'
  ],
  [ 'http://columbia-dev.barkleylabs.com/lauren-l-wong', 'node/299' ],
  [
    'http://columbia-dev.barkleylabs.com/arvind-srinivasan-0',
    'node/391'
  ],
  [
    'http://columbia-dev.barkleylabs.com/about/news/strengthening-stem-through-inclusion',
    'node/281'
  ],
  [ 'http://columbia-dev.barkleylabs.com/dean-dakolias', 'node/286' ],
  [
    'http://columbia-dev.barkleylabs.com/stella-noella-tetero',
    'node/392'
  ],
  [
    'http://columbia-dev.barkleylabs.com/american-society-civil-engineers',
    'node/395'
  ],
  [ 'http://columbia-dev.barkleylabs.com/imelda-adjei', 'node/397' ],
  [ 'http://columbia-dev.barkleylabs.com/james-li', 'node/298' ],
  [ 'http://columbia-dev.barkleylabs.com/ziad-dalloul', 'node/287' ],
  [
    'http://columbia-dev.barkleylabs.com/andrea-vargas-mark',
    'node/400'
  ],
  [ 'http://columbia-dev.barkleylabs.com/imani-gosserand', 'node/402' ],
  [
    'http://columbia-dev.barkleylabs.com/about/news/self-training-machines',
    'node/393'
  ]
];

// Load all of the records in the table
let result = await table.selectRecordsAsync();

// Prepare updates
let updates = [];

for (let record of result.records) {
    let originalValue = record.getCellValueAsString(field);

    // Skip records which don't have the value set, so the value is null
    if (!originalValue) {
        continue;
    }

    // Check if the originalValue matches any URLs in the urlNodePairs
    let newValue = originalValue;
    for (let [url, nodePath] of urlNodePairs) {
        if (originalValue.includes(url)) {
            newValue = newValue.replace(url, nodePath);
        }
    }

    // If a replacement was made, prepare this record for updating
    if (originalValue !== newValue) {
        updates.push({
            id: record.id,
            fields: {
                [field.id]: newValue,
            },
        });
    }
}

// Output found replacements
if (!updates.length) {
    output.text('No replacements found.');
} else {
    output.text(`Preparing to update ${updates.length} records.`);
    
    // Update the records in batches of up to 50 due to Airtable API limits
    while (updates.length) {
        await table.updateRecordsAsync(updates.slice(0, 50));
        updates = updates.slice(50); // Proceed to the next batch
    }
    
    output.text('Updates completed.');
}