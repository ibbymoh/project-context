from camel_tools.utils.dediac import dediac_ar
from camel_tools.utils.normalize import normalize_alef_maksura_ar
from camel_tools.utils.normalize import normalize_alef_ar
from camel_tools.utils.normalize import normalize_teh_marbuta_ar
from camel_tools.tokenizers.word import simple_word_tokenize
from camel_tools.disambig.mle import MLEDisambiguator




def ortho_normalize(text):
    text = normalize_alef_maksura_ar(text)
    text = normalize_alef_ar(text)
    text = normalize_teh_marbuta_ar(text)
    return text


def breakdown_grammar(text):

    #step 1 remove the diacritics
    text = dediac_ar(text)

    #step 2 orthornormalise the text
    text = ortho_normalize(text)

    #step 3 split word into tokens
    text = simple_word_tokenize(text)

    #step 4 morphological disambiguator
    mle = MLEDisambiguator.pretrained()
    disambig = mle.disambiguate(text)
    pos_tags = [d.analyses[0].analysis['pos'] for d in disambig]
    diacritized = [d.analyses[0].analysis for d in disambig]
    root = [d.analyses[0].analysis['root'] for d in disambig]
    print(diacritized)



breakdown_grammar("اليوم سأذهب إلى المتجر")
