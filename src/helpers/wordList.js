import ReactHtmlParser from "react-html-parser";
import ContextPopper from "../components/ContextPopper";

export const wordList = [
  {
    title: "Algoritmes",
    content:
      "Een aantal herhalende/iteratieve berekeningen om wiskundige vragen mee op te lossen. Voor het uitrekenen van algoritmen worden meestal computers gebruikt.",
    match: "algoritmes",
    options: "gi",
  },
  {
    title: "Aquaminerals",
    content:
      "Voorheen: Reststoffenunie. Bedrijf, dat bestemmingen zoekt voor stofstromen die vrijkomen bij het zuiveren van water. Oorspronkelijk opgericht door de drinkwaterbedrijven. Waterschappen sluiten zich hier steeds meer bij aan.",
    match: "aquaminerals",
    options: "gi",
  },
  {
    title: "Audit",
    content:
      "Methode van intern (zelf)onderzoek om de kwaliteit van werkprocessen te verbeteren",
    match: "Audit",
    options: "gi",
  },
  {
    title: "AWZI",
    content: "Afvalwaterzuiveringsinstallatie",
    match: "AWZI",
    options: "g",
  },
  {
    title: "Biogas",
    content:
      "Gas gemaakt uit (organisch) afval dat in de plaats van b.v. aardgas kan worden gebruikt. ",
    match: "biogas",
    options: "gi",
  },
  {
    title: "Boezem(systeem)",
    content:
      "Het systeem van hoofdwaterwegen binnen het beheergebied van Delfland.",
    match: "boezem",
    options: "gi",
  },
  {
    title: "BOS",
    content:
      "Beslissing Ondersteunend Systeem. Dit is een methode om te bepalen welke investeringen het beste zijn gezien de voorliggende vraagstukken.",
    match: "BOS",
    options: "g",
  },
  {
    title: "Chemische waterkwaliteit",
    content:
      "Dit betreft de chemische stoffen in het oppervlaktewater, bijvoorbeeld gewasbeschermingsmiddelen en voedingsstoffen zoals fosfaat en stikstof. Emissies uit de industrie, glastuinbouw en landbouw beïnvloeden dit.",
    match: "Chemische waterkwaliteit",
    options: "gi",
  },
  {
    title: "COASTAR",
    content:
      "COastal Aquifer STorage And Recovery. Zuid-Hollands samenwerkingsverband gericht op grootschalige zoetwatervoorziening door innovatief gebruik van de ondergrond.",
    match: "COASTAR",
    options: "gi",
  },
  {
    title: "Datascience",
    content:
      "Vakgebied gericht op het verkrijgen van inzichten uit data (digitale en statistische gegevens).",
    match: "Datascience",
    options: "gi",
  },
  {
    title: "Delfland Academie",
    content: "Interne opleidingsorganisatie van enkele waterschappen.",
    match: "Delfland Academie",
    options: "gi",
  },
  {
    title: "Delfluent",
    content:
      "Naam van de private organisatie, die rioolgemalen en de zuiveringen De Harnaschpolder en Houtrust exploiteert.",
    match: "Delfluent",
    options: "gi",
  },
  {
    title: "Design Thinking",
    content:
      "Methode om oplossingen te zoeken voor zeer complexe vraagstukken.",
    match: "Design Thinking",
    options: "gi",
  },
  {
    title: "Digitale Transformatie",
    content:
      "Het bieden van maatschappelijke meerwaarde door verandering van producten, diensten, werkprocessen, cultuur en mensen, gedreven en ondersteund door informatievoorziening en automatisering.",
    match: "Digitale Transformatie",
    options: "gi",
  },
  {
    title: "DSO",
    content:
      "Digitaal Stelsel Omgevingswet. Gezamenlijke website van alle overheden in Nederland, waarin zaken rond de Omgevingswet te vinden zijn.",
    match: "DSO",
    options: "g",
  },
  {
    title: "Ecologische waterkwaliteit",
    content:
      "De kwaliteit van het ecosysteem in het water, dat bestaat uit flora en fauna die past bij het plaatselijk ‘natuurlijke’ watersysteem. Chemische en biologische factoren bepalen dit.",
    match: "Ecologische waterkwaliteit",
    options: "gi",
  },
  {
    title: "Effluent",
    content: "Water dat na zuivering de afvalwaterzuivering verlaat.",
    match: "Effluent",
    options: "gi",
  },
  {
    title: "EFGF",
    content:
      "Energie- en Grondstoffenfabriek. Gezamenlijk initiatief van de Nederlandse waterschappen om energie en grondstoffen uit afvalwater te winnen.",
    match: "EFGF",
    options: "g",
  },
  {
    title: "Estuarium",
    content:
      "Gebied waar een rivier in zee stroomt en het zoete rivierwater zich met het zoute zeewater mengt.",
    match: "Estuarium",
    options: "gi",
  },
  {
    title: "Exoten",
    content:
      "Dieren en planten, die oorspronkelijk niet in ons watersysteem voorkwamen en soms schade aan het watersysteem aanbrengen.",
    match: "Exoten",
    options: "gi",
  },
  {
    title: "GGA",
    content: "Gebiedsgerichte Aanpak Stikstof Duinen",
    match: "GGA",
    options: "g",
  },
  {
    title: "Groen gas",
    content:
      "Duurzame variant van aardgas, dat wordt gemaakt door biogas op te waarderen tot het dezelfde kwaliteit heeft als aardgas",
    match: "Groen gas",
    options: "gi",
  },
  {
    title: "HVC",
    content:
      "Huisvuilcentrale, een niet-commercieel afvalverwerkingsbedrijf, actief in Flevoland, Noord- en Zuid-Holland. Zij verwerken het slib dat na het zuiveren van afvalwater overblijft.",
    match: "HVC",
    options: "gi",
  },
  {
    title: "HWBP",
    content:
      "Hoogwaterbeschermingsprogramma: Een samenwerkingsverband van de waterschappen en Rijkswaterstaat om waterkeringen langs rivieren en de zee te verbeteren, zodat deze in 2050 aan alle eisen voldoen.",
    match: "HWBP",
    options: "g",
  },
  {
    title: "Hybride werken",
    content:
      "Situatie waarbij mensen deels op hun werklocaties en deels vanuit hun eigen huis werken.",
    match: "Hybride werken",
    options: "gi",
  },
  {
    title: "ILT",
    content:
      "Inspectie Leefomgeving en Transport. Deze organisatie houdt o.a. toezicht of Delfland de primaire waterkeringen op orde houdt.",
    match: "ILT",
    options: "g",
  },
  {
    title: "Influent",
    content:
      "Het afvalwater dat richting de zuivering gaat om te worden gezuiverd.",
    match: "Influent",
    options: "gi",
  },
  {
    title: "IPCC",
    content:
      "Intergovernmental Panel on Climate Change, het klimaatpanel van de Verenigde Naties.",
    match: "IPCC",
    options: "gi",
  },
  {
    title: "Kering, waterkering",
    content:
      "Zeewering, duinen, dijken, kaden en andere kunstmatige of natuurlijke hoogten die bescherming bieden tegen overstromingen vanuit de zee, rivieren, boezem- of polderwater. Er wordt onderscheid gemaakt tussen primaire, regionale en overige keringen.",
    match: "Kering, waterkering",
    options: "gi",
  },
  {
    title: "Klare Taal",
    content:
      "Project om overheidscommunicatie zoveel mogelijk in begrijpelijke taal te schrijven.",
    match: "Klare Taal",
    options: "gi",
  },
  {
    title: "KRW",
    content: "Europese Kaderrichtlijn Water",
    match: "KRW",
    options: "g",
  },
  {
    title: "KWA",
    content:
      "Klimaatbestendige Wateraanvoer (voorheen: Kleinschalige Wateraanvoer). Afspraak tussen vier waterschappen (Delfland, Rijnland, Schieland en de Krimpenerwaard en Stichtse Rijnlanden) en Rijkswaterstaat om bij droogte meer zoetwater beschikbaar te krijgen.",
    match: "KWA",
    options: "g",
  },
  {
    title: "Legger",
    content:
      "Formeel vastgesteld register van waterstaatswerken (bijvoorbeeld boezemwateren en waterkeringen) met daarin per waterstaatswerk met de ligging in het gebied, de vereiste afmetingen, de onderhoudsplichtigen en onderhoudsverplichtingen.",
    match: "Legger",
    options: "gi",
  },
  {
    title: "LTO",
    content: "Land- en Tuinbouworganisatie Nederland",
    match: "LTO",
    options: "g",
  },
  {
    title: "Meerlaagse veiligheid",
    content:
      "Drie stappen om schade door overstromingen te beperken. Voorkomen van overstromingen met waterkeringen. Gebiedsinrichting zodat bij overstroming de schade wordt beperkt (speciaal bij vitale infrastructuur). Goede crisisorganisatie om gevaar voor mens en dier te beperken.",
    match: "Meerlaagse veiligheid",
    options: "gi",
  },
  {
    title: "Microplastics",
    content:
      "Kleine vaste kunststofdeeltjes (kleiner dan 5 millimeter), die slecht oplosbaar zijn in water en niet afbreekbaar.",
    match: "Microplastics",
    options: "gi",
  },
  {
    title: "NAD",
    content:
      "Netwerk Waterketen Delfland (voorheen: Netwerk Afvalwaterketen Delfland). Samenwerking tussen drinkwaterbedrijven, gemeenten en waterschap voor de waterketen in ons gebied.",
    match: "NAD",
    options: "g",
  },
  {
    title: "Nanodeeltjes",
    content:
      "Deeltje met afmetingen in de orde van 1-100 nanometer. Een nanometer is een miljardste van een meter.",
    match: "Nanodeeltjes",
    options: "gi",
  },
  {
    title: "Neurale netwerken",
    content:
      "Machine learning techniek die gebaseerd is op de werking van de hersenen. O.a. zelfrijdende auto’s maken hier gebruik van.",
    match: "Neurale netwerken",
    options: "gi",
  },
  {
    title: "NWP",
    content: "Nationaal Waterprogramma",
    match: "NWP",
    options: "g",
  },
  {
    title: "OBS",
    content: "Onderhoudsbeheersysteem",
    match: "OBS",
    options: "g",
  },
  {
    title: "OESO",
    content:
      "Organisatie voor Economische Samenwerking en Ontwikkeling. 38 landen werken hierin samen rond sociale en economische vraagstukken.",
    match: "OESO",
    options: "g",
  },
  {
    title: "Omgevingsdienst",
    content:
      "Uitvoerende organisatie, die de milieutaken van gemeenten en provincie uitvoert.",
    match: "Omgevingsdienst",
    options: "gi",
  },
  {
    title: "Omgevingswet ",
    content:
      "De Omgevingswet is een wet, waarin alle wetten en regels rond de fysieke leefomgeving zijn samengebracht. O.a. de Waterwet gaat hierin op. De verwachting is dat de Omgevingswet op 1 juli 2022 van kracht wordt.",
    match: "Omgevingswet ",
    options: "gi",
  },
  {
    title: "Opkomende stoffen",
    content:
      "Stof die tot voor kort niet of nauwelijks bekend was, en nog niet duidelijk is of en hoe schadelijk is voor mens en milieu",
    match: "Opkomende stoffen",
    options: "gi",
  },
  {
    title: "ORBP",
    content:
      "Overstromingsrisicobeheerplan. Dit is een bijlage bij het Nationaal Waterprogramma.",
    match: "ORBP",
    options: "gi",
  },
  {
    title: "Overig water",
    content:
      "Term gebruikt voor oppervlaktewater, dat niet onder de Kaderrichtlijn Water (KRW) valt.",
    match: "Overig water",
    options: "gi",
  },
  {
    title: "Overstort (riooloverstort)",
    content:
      "Water dat uit het riool naar watergangen stroomt. Dit gebeurt bijvoorbeeld bij zware regenbuien als het riool volloopt en de extra neerslag niet meer kan afvoeren. ",
    match: "Overstort",
    options: "gi",
  },
  {
    title: "PHA",
    content:
      "PolyHydroxyAlkanoaat is een grondstof voor volledig biologisch afbreekbaar plastic. Het kan worden gewonnen uit slib dat na afvalwaterzuivering overblijft.",
    match: "PHA",
    options: "g",
  },
  {
    title: "PPS",
    content:
      "Publiek Private Samenwerking. Daar waar de overheid met marktpartijen samenwerkt om iets te realiseren en waar bepaalde samenwerkingsvormen voor bedacht worden. Een voorbeeld binnen Delfland is de zuiveringsinstallatie in de Harnaschpolder en Houtrust.",
    match: "PPS",
    options: "g",
  },
  {
    title: "RES",
    content:
      "Regionale Energie Strategie. Ten behoeve van de energietransitie stellen de overheden binnen elke regio in Nederland met elkaar een RES op.",
    match: "RES",
    options: "g",
  },
  {
    title: "Regio West (crisisbeheersing)",
    content:
      "De Unie van Waterschappen heeft Nederland voor crisisbeheersing in vier regio’s verdeeld. In de regio West vallen Amstel, Gooi & Vecht, Delfland, Hollandse Delta, Rijnland, Scheldestromen en Schieland en de Krimpenerwaard.",
    match: "Regio West",
    options: "gi",
  },
  {
    title: "ROR",
    content:
      "Richtlijn Overstromingsrisico’s; Europese regelgeving die verplicht om negatieve gevolgen van overstroming voor mensen, het milieu en cultureel erfgoed inzichtelijk te maken.",
    match: "ROR",
    options: "g",
  },
  {
    title: "RoSA",
    content:
      "Rotterdamse Samenwerking in de Afvalwaterketen. Samenwerkingsverband voor de waterketen in de regio Rotterdam.",
    match: "RoSA",
    options: "gi",
  },
  {
    title: "Samenspel",
    content:
      "Titel van de organisatieontwikkeling die Delfland in 2020 heeft gestart.",
    match: "Samenspel",
    options: "gi",
  },
  {
    title: "SGBP3",
    content:
      "Stroomgebiedbeheerplan 2022-2027. Actieplan voor verbetering van het watersysteem dat alle landen in de EU opstellen.",
    match: "SGBP3",
    options: "g",
  },
  {
    title: "Small five",
    content:
      "Vijf diersoorten waarmee kan worden beoordeel hoe goed het gaat met de biodiversiteit in het gebied. Dit zijn de grutto, weidehommel, glassnijder, rugstreeppad en bittervoorn.",
    match: "Small five",
    options: "gi",
  },
  {
    title: "Stoffenketens",
    content:
      "De weg of cyclus die een stof doorloopt van gebruik tot afval en daarbij de waterkwaliteit kan beïnvloeden. Bijvoorbeeld de medicijnketen die medicijnresten levert die waterdieren beïnvloeden. Of de plasticketen die schadelijke microplastics in het water brengen. ",
    match: "Stoffenketens",
    options: "gi",
  },
  {
    title: "STOWA",
    content:
      "Stichting Toegepast Onderzoek Waterbeheer, het kenniscentrum van de Nederlandse waterschappen en provincies.",
    match: "STOWA",
    options: "g",
  },
  {
    title: "Stresstest",
    content:
      "Dit is een methode om de maatschappelijke gevolgen van klimaatverandering in kaart te brengen.",
    match: "Stresstest",
    options: "gi",
  },
  {
    title: "Veiligheidsregio’s",
    content:
      "Samenwerkingsverbanden van overheden op het gebied van veiligheid met als doel de gezondheid en veiligheid te garanderen.",
    match: "Veiligheidsregio’s",
    options: "gi",
  },
  {
    title: "VV",
    content: "Verenigde Vergadering, het Algemeen Bestuur van Delfland.",
    match: "VV",
    options: "g",
  },
  {
    title: "VVE",
    content:
      "Vereniging van Eigenaren, meestal van woningen in een appartementencomplex.",
    match: "VVE",
    options: "g",
  },
  {
    title: "Waterharmonica",
    content:
      "Project om gezuiverd water in te zetten als zoet water, bijvoorbeeld als zwemwater bij de Krabbeplas.",
    match: "Waterharmonica",
    options: "gi",
  },
  {
    title: "Waterketen",
    content:
      "Het totaal van stappen en activiteiten die water aflegt naar de kraan, het riool tot en met het zuiveren en de lozing van het gezuiverd afvalwater. Hierbij zijn gemeenten, waterschappen, provincie en drinkwaterbedrijven betrokken.",
    match: "Waterketen",
    options: "gi",
  },
  {
    title: "Waterschapsverordening",
    content:
      "In het kader van de Omgevingswet wordt de keur omgezet in een waterschapsverordening. Dit bevat regels die een waterschap gebruikt bij de bescherming van waterkeringen, watergangen en bijbehorende kunstwerken/constructies.",
    match: "Waterschapsverordening",
    options: "gi",
  },
  {
    title: "Waterschapswet",
    content:
      "Wet die de instelling en opheffing van een waterschap regelt. Bij instelling worden de taken en inrichting van het waterschap en de samenstelling van het bestuur geregeld. De taken van waterschappen zijn sinds 2009 verder uitgewerkt in de Waterwet.",
    match: "Waterschapswet",
    options: "gi",
  },
  {
    title: "Waterwet",
    content:
      "Wet waarin taken van waterschappen zijn uitgewerkt. De Waterwet en andere wetten op het gebied van de leefomgeving gaan geheel of gedeeltelijk op in de Omgevingswet. De verwachting is dat dat gebeurt op 1 juli 2022.",
    match: "Waterwet",
    options: "gi",
  },
  {
    title: "WBP6",
    content:
      "Waterbeheerprogramma 2022-2027. Aangezien het de zesde editie heeft het de afkorting WBP6. Wettelijk verplicht beleidsdocument waarin waterschappen maatregelen opnemen om te voldoen aan o.a. de richtlijnen waterkwaliteit.",
    match: "WBP6",
    options: "g",
  },
  {
    title: "Webcare",
    content: "Vorm van digitale dienstverlening.",
    match: "Webcare",
    options: "gi",
  },
  {
    title: "Zoetwaterfabriek",
    content:
      "Project om gezuiverd water in te zetten als zoet water, bijvoorbeeld als zwemwater bij de Krabbeplas.",
    match: "Zoetwaterfabriek",
    options: "gi",
  },
];

const replaceToelichting = (data, { title, match, options }) => {
  const pattern = new RegExp(match, options);
  const replace = "<Contextpopper>" + title + "</Contextpopper>";
  return data.replace(pattern, replace);
};

const parseToelichting = (data) => {
  wordList.forEach((word) => {
    data = replaceToelichting(data, word);
  });

  return data;
};

const transform = (node, index) => {
  if (node.type === "tag" && node.name === "contextpopper") {
    return <ContextPopper key={index} title={node.children[0].data} />;
  }
};

const parseHtml = (content) => {
  if (content === undefined) {
    return ReactHtmlParser("");
  } else {
  }
  return ReactHtmlParser(parseToelichting(content), {
    transform: transform,
  });
};

export default parseHtml;
