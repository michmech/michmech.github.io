---
published: 2025-03-01
author: Michal Měchura
myrole:
title: Falsehoods programmers believe about languages
blurb: This is what we have to put up with in the software localisation industry.
preview: illustration.jpg
---

# Falsehoods programmers believe about languages


This is what we have to put up with in the software localisation industry. {.lead}

![Illustration by “b b” on Unsplash](illustration.jpg)

I can’t believe nobody has done this list yet. I mean, there is one about [names](https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/), one about [time](https://gist.github.com/timvisee/fcda9bbdff88d45cc9061606b4b923ca) and many others on [other topics](https://github.com/kdeldycke/awesome-falsehood?tab=readme-ov-file), but not one about languages yet (except one [honorable mention](http://garbled.benhamill.com/2017/04/18/falsehoods-programmers-believe-about-language) that comes close). So, here’s my attempt to list all the misconceptions and prejudices I’ve come across in the course of my long and illustrious career in software localisation and language technology. Enjoy – and [send me](mailto:michmech@lexiconista.com) your own ones! {.meta}

---

- Sentences in all languages can be templated as easily as in English: `{user} is in {location}` etc.
  <details>
    <summary>Explain...</summary>
    
    In some languages, the form of the preposition ‘in’ may depend on the word that follows it.
    - Czech: `v koupelně` ‘in the bathroom’ but `ve sklepě` ‘in the basement’.
    - Irish: `in áit nua` ‘in a new place’ but `i láthair nua` ‘in a new location’.

    If the location is a placename, then the ‘in’ may be either ‘in’ or ‘on’ in some languages, depending on the placename.
    - Czech: `v Čechách` ‘in Bohemia’ but `na Moravě` ‘in Moravia’, literally ‘on’.

    If the location begins with the definite article ‘the’ or something like that, then the article may merge with the preposition into a single word.
    - Irish: `an Vatacáin` ‘the Vatican’ → `sa Vatacáin` ‘in the Vatican’.
    - German: `der Vatikan` ‘the Vatican’ → `im Vatikan` ‘in the Vatican’ (`in dem Vatikan` is also possible but less common).

    If the location is a string you are getting from a database or something like that, then the form in which it needs to appear in your template may be different from the form your database gives you, for example becase it needs to be inflected for some grammatical case (like in Slavic languages) or its initial consonant needs to be mutated (like in Celtic languages).
    - Czech: `Praha` ‘Prague’ → `v Praze` ’in Prague’
    - Irish `fillteán` ‘folder’ → `i bhfillteán` ‘in a folder’
  </details>

- Words that are short in English are short in other languages too.
  <details>
    <summary>Explain...</summary>

    One valid translation for ‘food’ in German is `Lebensmittel`: almost three times as long. The Irish for ‘please’ is `le do thoil`, three words instead of one. In Czech, ‘bus stop’ is `zastávka autobusu`, the same number of words but over twice as many characters.

    Differences like these can break horizontally arranged UIs like menus and tables.

  </details>

- For any text in any language, its translation into any other language is approximately as long as the original.
  <details>
    <summary>Explain...</summary>

    It is a well-known fact that no matter which language you are translating from and into, the translation often ends up being longer than the original. Even experts disagree on why this is but it’s probably related to how **language production** works in the human brain: when you’re writing an original text from scratch in some language, your decisions about *what* to say are partially influenced by what happens to be *easy* to say in that language; but when translating into another language you don’t have the same amount of freedom anymore, you are constrained by what the original author has decided.
    
    This is the same reason why, in spite of the translator’s best efforts, translated texts sometimes feel less “natural” than original texts, but that is a different matter...
  </details>

- For every lower-case character, there is exactly one (language-independent) upper-case character, and vice versa.
  <details>
    <summary>Explain...</summary>

    In most languages, the lower-case `i` (with a dot) upper-cases into `I` (without a dot). In Turkish, however:
    - `i` (with a dot) upper-cases into `İ` (also with a dot)
    - `ı` (without a dot) upper-cases into `I` (also without a dot)

    More on the [Dotless I...](https://en.wikipedia.org/wiki/Dotless_I)

    In German, the character `ß` has traditionally only existed in lower-case and, to upper-case it, you had to turn into two capital S: `Viel Spaß` becomes `VIEL SPASS`. That's how it has worked for centuries. Recently a capitalised version of `ß` has been brought into the world and even accepted into Unicode, but far from everybody likes it.
    
    More on the [German Capital Letter Eszett...](https://medium.com/@typefacts/the-german-capital-letter-eszett-e0936c1388f8)

  </details>

- The lower-case/upper-case distinction exists in all languages.
   <details>
    <summary>Explain...</summary>

    This distinction exists only in some writing systems, notably the Latin alphabet (used in English and many other European languages), the Cyrillic alphabet (Russian etc.) and the Greek alphabet. It doesn't exist in the alphabets used for writing Arabic, Hebrew, Chinese, Korean etc.   

  </details>

- All languages have words for exactly the same things as English.
  <details>
    <summary>Explain...</summary>

    Languages generally don't have words for exactly the same things. Languages are not just different *codes* for the same stuff, they are different ways of *understanding* stuff. That's why Russian has two words for different kinds of ‘blue’ and Czech has one word for both ‘security’ and ‘safety’.
  </details>

- Every expression in English, however vague and out-of-context, always has exactly one translation in every other language. 
  <details>
    <summary>Explain...</summary>

    Is ‘file’ a noun (a file somewhere on your computer) or a verb (to file something somewhere)? Is ‘open’ a verb (to open something) or an adjective (something is open)? Most languages would have different translations for these. Your localizers will hate you if you give them such isolated words to translate.

    Multi-word expressions can have the same problem. What's a ‘conditional jump instruction’? Is it an instruction to do a conditional jump, or a conditional instruction to do a jump? Those two readings would have different translations in many languages, even if that may seem like hair-splitting to you.

    And even if the intended meaning is clear, there may still be two or more valid ways to translate it – just like in English where you often have more than one way to say something. 
  </details>

- All languages follow the subject-verb-object word order.
  <details>
    <summary>Explain...</summary>

    Celtic languages such as Irish and Welsh don't: most sentences in these languages are verb-first, so the order is verb-subject-object.

    Some languages, notably Czech and to some extent also German, have a more or less *free word order* and sentences can come in many different arrangements including verb-first and object-first.

    This matters in concatenated UI strings such as `device + "is connected"`. You can never translate something like `is connected` into a language like Irish because, in Irish, the `device` needs to come between the `is` and the `connected`. If you are going to localize this string into other languages, you need to do your globalization homework first and refactor it into a more language-neutral template like `"{device} is connected"` where your localizers will have the freedom to move `{device}` around in the sentence.

  </details>

- When words are to be converted into *Title Case*, it is always the first character of the word that needs to be capitalized, in all languages.
  <details>
    <summary>Explain...</summary>

    In Irish, the first one or two characters at the beginning of a word are sometimes the result of something called *initial mutation* and these characters must remain uncapitalized. What gets capitalized is the first character *after* that. Examples: `Bóthar na bhFál` (the Irish name for Falls Road in Belfast), `An tAonas Eorpach` ‘The European Union’.

    In Dutch, the two characters `ij` are treated as if they were a single letter and, when they are at the beginning of a word you are going to capitalize, they both need to be capitalized: `IJsselmeer` and `IJmuiden` are placenames in the Netherlands.

    So, when capitalizing a string, you need to know what language it is in.
  </details>

- When a placename, the name of an institutions or any other name contains more than one word, it is written in *Title Case* such that each word begins with an upper-case character.
  <details>
    <summary>Explain...</summary>

    In many European languages, only the first word is title-cased.
    - Czech: `Evropská unie` ‘European Union’
    - French: `Union européenne` ‘European Union’

    Even in English, not every single word is always title-cased. Function words like ‘of’ and ‘the‘ often remain lower-case: `Office of the Ombudsman` and so on.
  </details>

- Every language has words for *yes* and *no*. These words never change, regardless of which question they are answering.
  <details>
    <summary>Explain...</summary>

    Celtic languages such as Irish and Scottish Gaelic don't have words for *yes* and *no*. In these languages, questions are answered by recycling the verb from the question. Examples:
    - `ar shiúil tú?` ‘did you walk?’
      - `shiúil` ‘yes’, literally ‘walked’ 
      - `níor shiúil` ‘no’, literally ‘didn’t walk’ 
    - `ar thiomáin tú?` ‘did you drive?’
      - `thiomáin` ‘yes’, literally ‘drove’ 
      - `níor thiomáin` ‘no’, literally ‘didn’t drive’ 

    This is a well-known complication when localizing dialog boxes with pre-baked ‘yes’ and ‘no’ buttons.
  </details>

- There is always only one correct way to spell anything.
  <details>
    <summary>Explain...</summary>

    Would be nice but no. There are regional differences (`colour` and `color`), stylistical preferences (`café` and `cafe`), different points of view (`log into something` versus `log in to something`) and what not. By all means, be strict and consistent in your own writing if you want but be tolerant in what you accept.

  </details>

- Each language is written in exactly one alphabet.
  <details>
    <summary>Explain...</summary>

    Notoriously, Serbian [can be and is](https://en.wikipedia.org/wiki/Serbian_language#Writing_system) written in either the Latin aphabet or the Cyrillic alphabet.

  </details>

- All languages (that use the Latin alphabet) have the same alphabetical sorting order.
  <details>
    <summary>Explain...</summary>

    Although the basic A-to-Z order is the same for all languages that use the Latin script, different languages follow different strategies as to where they place extended characters (= characters with accents). Some mix them in while others put them at the end:
    - In German, `Ä` comes right after `A` and before `B`.
    - In Swedish, `Ä` comes at the end of the alphabet, after `Z`.

    Shameless plug: I have a whole [chapter about alphabetical sorting](http://arit.lexiconista.com/arit/chap06/) in my book *An Ríomhaire Ilteangach*.

  </details>

- All languages are written from left to right.
  <details>
    <summary>Explain...</summary>

    Arabic, Hebrew etc, are written from right to left. And don't even get me started on [bidirectional text...](https://en.wikipedia.org/wiki/Bidirectional_text)

  </details>

- Even in languages written from right to left, the user interface still “flows” from left to right.
  <details>
    <summary>Explain...</summary>

    No. In a well-designed Arabic UI, *everything* will flow from right to left. If your UI has a navigation menu on the left-hand side for English and other European languages, your Arabic version should have it on the right-hand side. You often see Arabic UIs which don't (because it's "difficult") but that's disappointing. Do it and your users will be delighted!

    I don't speak Arabic and so I am not basing this on personal experience, but years ago when we were localizing [Terminologue](https://www.terminologue.org/) into Arabic we did this and it was really well received by users.

    Ahmad Shadeed’s [RTL Styling 101](https://rtlstyling.com/) has a lot of useful guidance on this.

  </details>

- Every language puts spaces between words.
  <details>
    <summary>Explain...</summary>

    Chinese and Japanese don't, for one.

  </details>

- Segmenting a sentence into words is as easy as splitting on whitespace (and maybe punctuation).
  <details>
    <summary>Explain...</summary>

    That gets you far but not the whole way. Word-splitting natural-language text is never easy, there are always lots of annoying exceptions, in any language. It's a “difficult task” and you're better off using an NLP library for that. See [how spaCy does it](https://spacy.io/usage/linguistic-features#tokenization), for example.

  </details>

- Segmenting a text into sentences is as easy as splitting on end-of-sentence punctuation.
  <details>
    <summary>Explain...</summary>

    End-of-sentence punctuation symbols such as `.!?` are used for other things too. The period in particular is heavily overloaded with other functions such as abbreviations (`in the U.K.`) and number formatting (`30,000.00`). Sentence segmentation is a “difficult task” and you're better off using an NLP library for that. See [how spaCy does it](https://spacy.io/usage/linguistic-features#sbd), for example.

  </details>

- No language puts spaces before question marks and exclamation marks at the end of a sentence.
  <details>
    <summary>Explain...</summary>

    French does. Really, [look it up](https://en.wikipedia.org/wiki/French_orthography#Punctuation).

  </details>

- Questions marks and exclamation marks always appear at the end of the sentence.
  <details>
    <summary>Explain...</summary>

    Really? Let me introduce you to the wonders of Spanish punctuation:
    - `¿Dónde está tu chaqueta?`
    - `¡Qué buena idea!`

    Yes, in Spanish these things are actually pairs of two symbols where one goes at the start of the sentence and the other goes at the end. [More on Spanish punctuation...](https://www.babbel.com/en/magazine/spanish-punctuation-guide)

  </details>

- No language puts spaces after opening quotes and before closing quotes.
  <details>
    <summary>Explain...</summary>

    French does. Really, [look it up](https://en.wikipedia.org/wiki/French_orthography#Punctuation).

  </details>

- All languages use the same characters for opening quotes and closing quotes.
  <details>
    <summary>Explain...</summary>

    In English:
    - the opening quotes are shaped like `66`
    - the closing quotes are shaped like `99`

    and they are both located at the top of the line (superscript level). Example: `“blabla”`

    In many continental European languages, basically everywhere east of Germany including Germany itself:
    - the opening quotes are shaped like `99` and are located at the base of the line (subscript level) 
    - the closing quotes are shaped like `66` and are located at the top of the line (superscript level)
    
    Example: `„blabla“`

    These are the two main schemes that exist in Europe, but individual languages, countries and locales often have their highly specific styles which differ from these in details. One honorable mention is the French-speaking world where the quotes are usually `«` and `»`. This style is sometimes seen in German too, especially in Switzerland.

  </details>

- Numbers, when written out in digits, are formatted and punctuated the same way in all languages.
  <details>
    <summary>Explain...</summary>

    No they aren't. The same number looks different in different languages – or more accurately, in different locales.
    - English: `80,763.00`
      - the thousands separator is a comma
      - the decimal separator is a period
    - German, Czech etc.: `80.763,00`, sometimes also `80 763,00`
      - the thousands separator is a period or a (non-breaking) space
      - the decimal separator is a comma
    - In Switzerland (regardless of which language): `80'763.00`
      - the thousands separator is an apostrophe
      - the decimal separator is a period

    Shameless plug: the website for my book *An Ríomhaire Ilteangach* comes with a [Multicultural data formatter](http://arit.lexiconista.com/arit/multicultural-data-formatter/?m) which shows you how the same number is formatted in different locales.

  </details>

- No two languages are so similar that it would ever be difficult to tell them apart.
  <details>
    <summary>Explain...</summary>
    
    It's common in the Slavic language family to have pairs of languages which are so similar that, for short titles or slogans in particular, it can genuinely be both. Czech and Slovak, for example.

  </details>


- Languages that have similar names are similar.

  <details>
    <summary>Explain...</summary>

    Slovak and Slovene have similar names and, even though they belong to the same language family (Slavic), they aren't really all that similar, they're not even mutually understandable (not “out of the box” anyway) and the populations that speak them aren't geographical neighbours.

    Same for Serbian (the language Serbia) and Sorbian (a minority language in east Germany).

  </details>

- Icons and emojis that are based on English puns and wordplay are easily understood by speakers of other languages.
  <details>
    <summary>Explain...</summary>

    The key-shaped emoticon 🔑 only means ‘key’ as an in ‘of key importance’ to those who speak English. For nearly everyone else it just means ‘key’ as the thing you lock doors with.

    Send me your favourite pun icons and emoji wordplays that don't translate!

</details>

- Geolocation is an accurate way to predict the user’s language.
  <details>
    <summary>Explain...</summary>

    As a first guess, maybe. But you do need to ask the user eventually which language they prefer. What if I'm on holiday in Portugal and don't speak a word of Portuguese?
  
  </details>

- Country flags are accurate and appropriate symbols for languages.
  <details>
    <summary>Explain...</summary>

    Of course not but it's complicated: I have a whole separate [blog post about flags as language symbols](/flags-as-language-symbols/). 

  </details>

- Every country has exactly one “national” language.
  <details>
    <summary>Explain...</summary>

    Switzerland has four. Canada has two (at least). Belgium has two (or three if you're including German). Luxembourg has three.

    And what does it mean to be some country's “national” language anyway? It's such vague concept.

  </details>

- Every language is the “national” language of exactly one country.
  <details>
    <summary>Explain...</summary>

    German is the “national” language of Germany, Austria, Switzerland (along with three others), Luxembourg (along with two others) and God knows where else. French has this status in more countries that I care to enumerate. So does English, in fact.

  </details>
