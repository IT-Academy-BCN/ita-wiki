/**
 * Interactive tool to parse error messages from debugging tools.
 * 
 * For example, turns this:
 *
 
 "{\"message\":\"\\nInvalid `.findMany()` invocation in\\n/Users/swe/Documents/Repos/ita-wiki/back/src/controllers/getResourcesController.ts:27:8\\n\\n  24   where.topic = { equals: topic }\\n  25   \\n  26 const resources = await prisma.resource\\n→ 27   .findMany({\\n         where: {\\n           type: {\\n           ~~~~\\n             equals: 'BLOG'\\n           }\\n         },\\n         include: {\\n           topics: true,\\n           user: true\\n         }\\n       })\\n\\nUnknown arg `type` in where.type for type ResourceWhereInput. Did you mean `title`? Available args:\\ntype ResourceWhereInput {\\n  AND?: ResourceWhereInput | List<ResourceWhereInput>\\n  OR?: List<ResourceWhereInput>\\n  NOT?: ResourceWhereInput | List<ResourceWhereInput>\\n  id?: StringFilter | String\\n  title?: StringFilter | String\\n  description?: StringNullableFilter | String | Null\\n  url?: StringFilter | String\\n  resourceType?: EnumRESOURCE_TYPEFilter | RESOURCE_TYPE\\n  userId?: StringFilter | String\\n  createdAt?: DateTimeFilter | DateTime\\n  updatedAt?: DateTimeFilter | DateTime\\n  topics?: TopicsOnResourcesListRelationFilter\\n  user?: UserRelationFilter | UserWhereInput\\n}\\n\\n\"}"

 *
 * Into this:
 *
 
{"message":"
Invalid `.findMany()` invocation in
/Users/swe/Documents/Repos/ita-wiki/back/src/controllers/getResourcesController.ts:27:8

  24   where.topic = { equals: topic }
  25   
  26 const resources = await prisma.resource
→ 27   .findMany({
         where: {
           type: {
           ~~~~
             equals: 'BLOG'
           }
         },
         include: {
           topics: true,
           user: true
         }
       })

Unknown arg `type` in where.type for type ResourceWhereInput. Did you mean `title`? Available args:
type ResourceWhereInput {
  AND?: ResourceWhereInput | List<ResourceWhereInput>
  OR?: List<ResourceWhereInput>
  NOT?: ResourceWhereInput | List<ResourceWhereInput>
  id?: StringFilter | String
  title?: StringFilter | String
  description?: StringNullableFilter | String | Null
  url?: StringFilter | String
  resourceType?: EnumRESOURCE_TYPEFilter | RESOURCE_TYPE
  userId?: StringFilter | String
  createdAt?: DateTimeFilter | DateTime
  updatedAt?: DateTimeFilter | DateTime
  topics?: TopicsOnResourcesListRelationFilter
  user?: UserRelationFilter | UserWhereInput
}

"
 */

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const formatText = (text) => {
  return text
    .substring(1, text.length - 2)
    .replace(/\\\\/g, "\\")
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, "\"")
};

const line = () => {
    console.log("");
    console.log("====================================");
    console.log("");
}

const promptForText = () => {
    line()
  rl.question("Enter error: ", (text) => {
    line()
    console.log(formatText(text));
    promptForText();
  });
};

promptForText();