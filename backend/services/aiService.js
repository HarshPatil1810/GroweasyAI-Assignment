const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
});

async function processBatch(batch) {

  const prompt = `
You are a CRM data extraction expert.

You receive JSON records converted from CSV.

Your job is to intelligently map fields into this CRM schema.

Return ONLY valid JSON.

Schema:

{
  "imported":[
    {
      "created_at":"",
      "name":"",
      "email":"",
      "country_code":"",
      "mobile_without_country_code":"",
      "company":"",
      "city":"",
      "state":"",
      "country":"",
      "lead_owner":"",
      "crm_status":"",
      "crm_note":"",
      "data_source":"",
      "possession_time":"",
      "description":""
    }
  ],
  "skipped":[]
}

Rules:

1. Skip records having neither email nor mobile.

2. Allowed crm_status values only:

GOOD_LEAD_FOLLOW_UP
DID_NOT_CONNECT
BAD_LEAD
SALE_DONE

3. Allowed data_source:

leads_on_demand
meridian_tower
eden_park
varah_swamy
sarjapur_plots

If unknown keep empty.

4. If multiple emails exist:

Use first email.

Append remaining into crm_note.

5. If multiple mobiles exist:

Use first.

Append remaining into crm_note.

6. created_at must be ISO date.

Records:

${JSON.stringify(batch)}
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  // Remove markdown code fences if Gemini returns them
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

exports.extractCRM = async (rows) => {

    return await processBatch(rows);

};