export interface SearchArticles {
    abstract:         string;
    web_url:          string;
    snippet:          string;
    lead_paragraph:   string;
    print_section:    string;
    print_page:       string;
    source:           string;
    multimedia:       Multimedia[];
    headline:         Headline;
    keywords:         Keyword[];
    pub_date:         string;
    document_type:    string;
    news_desk:        string;
    section_name:     string;
    subsection_name:  string;
    byline:           Byline;
    type_of_material: string;
    _id:              string;
    word_count:       number;
    uri:              string;
}

export interface Byline {
    original:     string;
    person:       Person[];
    organization: null;
}

export interface Person {
    firstname:    string;
    middlename:   null;
    lastname:     string;
    qualifier:    null;
    title:        null;
    role:         string;
    organization: string;
    rank:         number;
}

export interface Headline {
    main:           string;
    kicker:         null;
    content_kicker: null;
    print_headline: string;
    name:           null;
    seo:            null;
    sub:            null;
}

export interface Keyword {
    name:  string;
    value: string;
    rank:  number;
    major: string;
}

export interface Multimedia {
    rank:      number;
    subtype:   string;
    caption:   null;
    credit:    null;
    type:      Type;
    url:       string;
    height:    number;
    width:     number;
    legacy:    Legacy;
    subType:   string;
    crop_name: string;
}

export interface Legacy {
    xlarge?:          string;
    xlargewidth?:     number;
    xlargeheight?:    number;
    thumbnail?:       string;
    thumbnailwidth?:  number;
    thumbnailheight?: number;
    widewidth?:       number;
    wideheight?:      number;
    wide?:            string;
}

export enum Type {
    Image = "image",
}

export interface FilterArticle {
    uri:            string;
    url:            string;
    id:             number;
    asset_id:       number;
    source:         string;
    published_date: string;
    updated:        string;
    section:        string;
    subsection:     string;
    nytdsection:    string;
    adx_keywords:   string;
    column:         null;
    byline:         string;
    type:           string;
    title:          string;
    abstract:       string;
    des_facet:      string[];
    org_facet:      any[];
    per_facet:      any[];
    geo_facet:      string[];
    media:          Media[];
    eta_id:         number;
}

export interface Media {
    type:                     string;
    subtype:                  string;
    caption:                  string;
    copyright:                string;
    approved_for_syndication: number;
    "media-metadata":         MediaMetadatum[];
}

export interface MediaMetadatum {
    url:    string;
    format: string;
    height: number;
    width:  number;
}
